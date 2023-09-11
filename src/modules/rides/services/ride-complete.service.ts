import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import { BookingStatus } from '@/modules/booking/enums';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';
import { RideStatus } from '../enums';
import { FindRidesService } from './ride-find.service';

@Injectable()
export class CompleteRideService {
  private logger = new Logger(CompleteRideService.name);

  constructor(
    private readonly ridesService: FindRidesService,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
  ) {}

  async run(rideId: string) {
    this.logger.log(`Ride ${rideId} complete request`);
    const ride = await this.ridesService.findById(rideId);

    ride.status = RideStatus.Completed;

    for (const booking of ride.bookings) {
      booking.status = BookingStatus.Completed;
      await this.bookingRepository.update(booking['_id'], booking);
      this.logger.log(`Booking ${booking['_id']} status changed to Completed`);
    }

    const updatedRide = await this.ridesRepository.update(rideId, ride);
    this.logger.log(`Ride completed`);

    return updatedRide;
  }
}
