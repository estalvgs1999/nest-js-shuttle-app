import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import { BookingStatus } from '@/modules/booking/enums';
import { CreateRideService } from './ride-create.service';
import {
  DRIVERS_REPOSITORY,
  DriversRepository,
} from '@/modules/drivers/repositories';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Ride } from '../entities';
import { RideAssignmentDto } from '../dtos';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';

@Injectable()
export class RideAssignationService {
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

    const driver = await this.driversRepository.findById(driverId);
    const booking = await this.bookingRepository.findById(bookingId);
    const ride = rideId
      ? <Ride>await this.ridesRepository.findById(rideId)
      : <Ride>await this.ridesService.run({
          driverId: driverId,
          mode: booking.ticket.mode,
          route: booking.ticket.route,
          availableSeats: driver.vehicle.capacity,
        });

    const bookingSeats =
      booking.passengersInfo.adults + booking.passengersInfo.kids;

    if (ride.hasAvailableSeats(bookingSeats)) {
      // update ride availableSeats
      ride.enrollPassengers(bookingSeats);
      await this.ridesRepository.update(ride['_id'], ride);

      // change booking status
      await this.bookingRepository.update(bookingId, {
        ...booking,
        status: BookingStatus.Scheduled,
      });

      // add booking to ride
      const updatedRide = await this.ridesRepository.addBooking(
        ride['_id'],
        bookingId,
      );

      // Returning updated Ride
      return updatedRide;
    } else {
      throw new InternalServerErrorException(
        'Ride has no enough available seats for this booking',
      );
    }
  }
}
