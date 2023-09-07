import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import { BookingStatus } from '@/modules/booking/enums';
import { Inject, Injectable } from '@nestjs/common';
import { Ride } from '../entities';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';

@Injectable()
export class RideCancelationService {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
  ) {}

  public async run(bookingId: string) {
    const booking = await this.bookingRepository.findById(bookingId);
    await this.bookingRepository.update(bookingId, {
      ...booking,
      status: BookingStatus.Cancelled,
    });

    const ride = <Ride>await this.ridesRepository.findByBooking(bookingId);
    const bookingSeats =
      booking.passengersInfo.adults + booking.passengersInfo.kids;
    ride.availableSeats -= bookingSeats;
    await this.ridesRepository.update(ride['_id'], { ...ride });
    return this.ridesRepository.cancelBooking(bookingId);
  }
}
