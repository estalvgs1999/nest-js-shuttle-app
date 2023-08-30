/* eslint-disable @typescript-eslint/no-var-requires */
import { CreateRideReservationsService } from './services';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RIDE_RESERVATIONS_REPOSITORY,
  RideReservationsMongoRepository,
} from './repositories';
import { RideReservation, RideReservationSchema } from './schemas';

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
