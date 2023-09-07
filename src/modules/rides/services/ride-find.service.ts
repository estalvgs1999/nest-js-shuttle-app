import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import {
  DRIVERS_REPOSITORY,
  DriversRepository,
} from '@/modules/drivers/repositories';
import { Inject, Injectable } from '@nestjs/common';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';
import { Ride } from '../schemas';
import { BookingFilterDto } from '@/modules/booking/dtos';
import { Booking } from '@/modules/booking/schemas';

@Injectable()
export class FindRidesService {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  async findAll(): Promise<Ride[]> {
    return await this.ridesRepository.findAll();
  }

  async findByDriver(driverId: string): Promise<Ride[]> {
    const rides = await this.ridesRepository.findAll();
    return rides.filter(ride => ride.driver['_id'].toString() === driverId);
  }

  async findByUser(userId: string): Promise<Ride[]> {
    const rides = await this.ridesRepository.findAll();
    const userRides = rides.filter(ride => this.hasUserBooking(ride, userId));
    return userRides;
  }

  private hasUserBooking(ride: Ride, userId: string) {
    const bookings: Booking[] = ride.bookings;
    for (const booking of bookings) {
      if (booking.clientInfo.client === userId) return true;
    }
    return false;
  }
}
