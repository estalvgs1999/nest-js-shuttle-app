import { Booking } from '@/modules/booking/schemas';
import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import { BookingStatus } from '@/modules/booking/enums';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Ride } from '../schemas';
import { RideMode, RideStatus } from '../enums';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';

@Injectable()
export class RideCancelationService {
  private logger = new Logger(RideCancelationService.name);

  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
  ) {}

  public async run(bookingId: string) {
    this.logger.log('Ride cancelation started');

    // Get ride and booking
    const booking = await this.bookingRepository.findById(bookingId);
    const ride = await this.ridesRepository.findByBooking(bookingId);

    // Release booking seats and change booking status
    await this.releaseSeats(booking, ride);
    await this.changeBookingStatusToCancelled(booking);

    // Remove booking from ride booking list
    let updatedRide = await this.ridesRepository.cancelBooking(bookingId);

    this.logger.log(`Booking removed from ride bookings.`);

    // Check for ride cancellation
    if (ride.mode === RideMode.Private || ride.bookings.length <= 0)
      updatedRide = await this.changeRideStatusToCancelled(updatedRide);
    return updatedRide;
  }

  /**
   * The function "releaseSeats" updates the available seats of a ride based on the number of
   * passengers in a booking and logs the updated seat count.
   * @param {Booking} booking - The `booking` parameter represents the booking information for a ride.
   * It contains details about the number of adults and kids included in the booking.
   * @param {Ride} ride - The `ride` parameter represents the ride object for which the seats need to
   * be released.
   */
  private async releaseSeats(booking: Booking, ride: Ride) {
    const bookingSeats =
      booking.passengersInfo.adults + booking.passengersInfo.kids;
    ride.availableSeats -= bookingSeats;
    const updatedRide = await this.ridesRepository.update(ride['_id'], ride);
    this.logger.log(
      `Releasing ${bookingSeats} from ride. Now ride has ${updatedRide.availableSeats} seats.`,
    );
  }

  /**
   * The function changes the status of a booking to "Cancelled" and logs the change.
   * @param {Booking} booking - The "booking" parameter is an object of type "Booking" that represents
   * a booking record.
   */
  private async changeBookingStatusToCancelled(booking: Booking) {
    booking.status = BookingStatus.Cancelled;
    await this.bookingRepository.update(booking['_id'], booking);
    this.logger.log('Booking status changed to Cancelled.');
  }

  private async changeRideStatusToCancelled(ride: Ride) {
    ride.status = RideStatus.Cancelled;
    const updatedRide = await this.ridesRepository.update(ride['_id'], ride);
    this.logger.log('Ride status changed to Cancelled.');
    return updatedRide;
  }
}
