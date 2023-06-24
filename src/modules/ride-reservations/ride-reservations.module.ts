/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RideReservation, RideReservationSchema } from './schemas';
import { CreateRideReservationsService } from './services';
import {
  RIDE_RESERVATIONS_REPOSITORY,
  RideReservationsMongoRepository,
} from './repositories';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: RideReservation.name,
        useFactory: () => {
          return RideReservationSchema.plugin(require('mongoose-autopopulate'));
        },
      },
    ]),
  ],
  providers: [
    {
      provide: RIDE_RESERVATIONS_REPOSITORY,
      useClass: RideReservationsMongoRepository,
    },
    CreateRideReservationsService,
  ],
})
export class RideReservationsModule {}
