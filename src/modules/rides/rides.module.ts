import { Booking, BookingSchema } from '../booking/schemas';
import {
  BOOKING_REPOSITORY,
  BookingMongoRepository,
} from '../booking/repositories';
import {
  CreateRideService,
  FindRidesService,
  RideAssignmentService,
  RideCancelationService,
  RideDriverSuggestionsService,
} from './services';
import { Driver, DriverSchema } from '../drivers/schemas';
import {
  DRIVERS_REPOSITORY,
  DriversMongoRepository,
} from '../drivers/repositories';
import {
  FindRidesController,
  RideAssignmentController,
  RideCancelationController,
} from './controllers';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schemas';
import { RIDES_REPOSITORY, RidesMongoRepository } from './repositories';
import { RideDriverSuggestionsController } from './controllers/ride-driver-suggestion.controller';

@Module({
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
    CreateRideService,
    RideAssignmentService,
    RideCancelationService,
    FindRidesService,
    RideDriverSuggestionsService,
  ],
  controllers: [
    RideAssignmentController,
    RideCancelationController,
    FindRidesController,
    RideDriverSuggestionsController,
  ],
  exports: [],
})
export class RidesModule {}
