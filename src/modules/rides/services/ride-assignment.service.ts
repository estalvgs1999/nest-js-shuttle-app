import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Booking } from '@/modules/booking/entities';
import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import { BookingStatus } from '@/modules/booking/enums';
import { CreateRideService } from './ride-create.service';
import { Driver } from '@/modules/drivers/entities';
import {
  DRIVERS_REPOSITORY,
  DriversRepository,
} from '@/modules/drivers/repositories';
import { Ride } from '../schemas';
import { RideAssignmentDto } from '../dtos';
import { RideMode } from '../enums';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';

@Injectable()
export class RideAssignmentService {
  private logger = new Logger(RideAssignmentService.name);

  constructor(
    private readonly ridesService: CreateRideService,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  public async run(assignmentDto: RideAssignmentDto) {
    const { driverId, bookingId, rideId } = assignmentDto;

    this.logger.log('Ride assignment started');

    // Get driver and booking
    const driver: Driver = await this.driversRepository.findById(driverId);
    const booking: Booking = await this.bookingRepository.findById(bookingId);

    // Get the ride and validate it
    const ride: Ride = await this.getRide(driver, booking, rideId);
    this.validateRide(booking, ride);

    // Check if ride has enough available seats
    const rideHasAvailableSeats = await this.enrollPassengers(ride, booking);

    try {
      // Assign booking to ride
      if (rideHasAvailableSeats) return await this.assignBooking(ride, booking);
      else
        throw new InternalServerErrorException(
          'Ride has no enough available seats for this booking',
        );
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  /**
   * The function validates a ride by checking if the booking is already assigned, if the booking and
   * ride mode are compatible, and if the ride is private and already has a booking assigned.
   * @param {Booking} booking - The `booking` parameter represents a booking object, which contains
   * information about a specific booking made by a user.
   * @param {Ride} ride - The `ride` parameter represents a specific ride that a user has requested. It
   * contains information about the ride, such as the mode of transportation (e.g., private, shared),
   * and any bookings that have been made for the ride.
   */
  private validateRide(booking: Booking, ride: Ride) {
    if (booking.status === BookingStatus.Scheduled)
      throw new ConflictException('Booking is already assigned');
    if (booking.status === BookingStatus.Completed)
      throw new BadRequestException('Booking is complete');
    if (booking.ticket.mode !== ride.mode)
      throw new ConflictException('Booking and ride mode are not compatible');
    if (ride.mode === RideMode.Private && ride.bookings.length > 0)
      throw new ConflictException(
        'The ride is private and already has a booking assigned.',
      );
  }

  /**
   * The getRide function retrieves a ride either by its ID or by creating a new ride based on the
   * driver, booking, and available seats.
   * @param {Driver} driver - The `driver` parameter is an object representing the driver who will be
   * assigned to the ride. It contains information about the driver, such as their ID, name, and other
   * relevant details.
   * @param {Booking} booking - The `booking` parameter represents the booking details for the ride. It
   * contains information such as the ticket mode, route, and other details related to the booking.
   * @param {string} rideId - The `rideId` parameter is a string that represents the unique identifier
   * of a ride.
   * @returns a Promise that resolves to a Ride object.
   */
  private async getRide(
    driver: Driver,
    booking: Booking,
    rideId: string,
  ): Promise<Ride> {
    return rideId
      ? await this.ridesRepository.findById(rideId)
      : await this.ridesService.run({
          driverId: driver['_id'],
          mode: booking.ticket.mode,
          route: booking.ticket.route,
          availableSeats: driver.vehicle.capacity,
        });
  }

  /**
   * The function "enrollPassengers" checks if there are enough available seats in a ride and updates
   * the available seats accordingly.
   * @param {Ride} ride - The `ride` parameter represents the ride object for which passengers are
   * being enrolled.
   * @param {Booking} booking - The `booking` parameter represents the booking information for a ride.
   * It contains details about the passengers, such as the number of adults and kids.
   * @returns a Promise<boolean>.
   */
  private async enrollPassengers(
    ride: Ride,
    booking: Booking,
  ): Promise<boolean> {
    const bookingSeats =
      booking.passengersInfo.adults + booking.passengersInfo.kids;

    if (ride.availableSeats <= 0 || ride.availableSeats - bookingSeats < 0)
      return false;
    ride.availableSeats -= bookingSeats;
    const updatedRide = await this.ridesRepository.update(ride['_id'], ride);
    this.logger.log(
      `Ride available seats updated. Now it has ${updatedRide.availableSeats} seats.`,
    );
    return true;
  }

  /**
   * The function assigns a booking to a ride, updates the booking status to "Scheduled", and returns
   * the updated ride.
   * @param {Ride} ride - The `ride` parameter is an object representing a ride. It likely contains
   * information such as the ride ID, driver details, pickup and drop-off locations, and other
   * ride-related data.
   * @param {Booking} booking - The `booking` parameter is an object that represents a booking. It
   * likely contains properties such as `id`, `status`, `rideId`, `userId`, and other relevant
   * information related to the booking.
   * @returns the updated ride after adding the booking and updating the booking status.
   */
  private async assignBooking(ride: Ride, booking: Booking): Promise<Ride> {
    const updatedRide = await this.ridesRepository.addBooking(
      ride['_id'],
      booking['_id'],
    );
    this.logger.log(`Booking assigned to this ride`);

    booking.status = BookingStatus.Scheduled;
    const updatedBooking: Booking = await this.bookingRepository.update(
      booking['_id'],
      booking,
    );
    this.logger.log(`Booking status updated to ${updatedBooking.status}`);
    return updatedRide;
  }
}
