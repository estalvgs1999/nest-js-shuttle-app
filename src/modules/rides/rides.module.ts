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
  RideCompletionService,
  RideDriverSuggestionsService,
  RidePickUpService,
  RideStartService,
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
  RideCompletionController,
  RideDriverSuggestionsController,
  RidePickUpController,
  RideStartController,
} from './controllers';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schemas';
import { RIDES_REPOSITORY, RidesMongoRepository } from './repositories';

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
    RidePickUpService,
    RideStartService,
    RideCompletionService,
    FindRidesService,
    RideDriverSuggestionsService,
  ],
  controllers: [
    RideAssignmentController,
    RideCancelationController,
    RidePickUpController,
    RideStartController,
    RideCompletionController,
    FindRidesController,
    RideDriverSuggestionsController,
  ],
  exports: [FindRidesService],
})
export class RidesModule {}
