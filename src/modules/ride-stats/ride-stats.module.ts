import { Booking, BookingSchema } from '../booking/schemas';
import {
  BOOKING_REPOSITORY,
  BookingMongoRepository,
} from '../booking/repositories';
import { Driver, DriverSchema } from '../drivers/schemas';
import {
  DRIVERS_REPOSITORY,
  DriversMongoRepository,
} from '../drivers/repositories';
import { DriverStatsController } from './controllers';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from '../rides/schemas';
import { RIDES_REPOSITORY, RidesMongoRepository } from '../rides/repositories';
import { DriverTenureService } from './services';

@Module({
  controllers: [DriverStatsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Ride.name,
        schema: RideSchema,
      },
      {
        name: Driver.name,
        schema: DriverSchema,
      },
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: RIDES_REPOSITORY,
      useClass: RidesMongoRepository,
    },
    {
      provide: DRIVERS_REPOSITORY,
      useClass: DriversMongoRepository,
    },
    {
      provide: BOOKING_REPOSITORY,
      useClass: BookingMongoRepository,
    },
    DriverTenureService,
  ],
})
export class RideStatsModule {}
