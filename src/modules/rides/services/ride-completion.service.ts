import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import { BookingStatus } from '@/modules/booking/enums';
import { FindRidesService } from './ride-find.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';
import { RideStatus } from '../enums';

@Injectable()
export class RideCompletionService {
  private logger = new Logger(RideCompletionService.name);

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
    ride.finish = new Date();
    ride.duration = this.calculateRideDuration(ride.start, ride.finish);

    for (const _booking of ride.bookings) {
      const booking = await this.bookingRepository.findById(_booking['_id']);
      booking.status = BookingStatus.Completed;
      await this.bookingRepository.update(booking['_id'], booking);
      this.logger.log(`Booking ${booking['_id']} status changed to Completed`);
    }

    const updatedRide = await this.ridesRepository.update(rideId, ride);
    this.logger.log(`Ride completed`);

    return updatedRide;
  }

  private calculateRideDuration(start: Date, finish: Date) {
    const milliseconds = finish.getTime() - start.getTime();
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${hours} h ${minutes} min`;
  }
}
