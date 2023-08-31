import {
  CreateReservationController,
  UpdateReservationStatusController,
} from './controllers';
import {
  CreateReservationService,
  UpdateReservationStatusService,
} from './services';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas';
import {
  RESERVATIONS_REPOSITORY,
  ReservationsMongoRepository,
} from './repositories';
import { RideTicketsModule } from '../ride-tickets/ride-reservations.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
    ]),
    RideTicketsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: RESERVATIONS_REPOSITORY,
      useClass: ReservationsMongoRepository,
    },
    CreateReservationService,
    UpdateReservationStatusService,
  ],
  controllers: [CreateReservationController, UpdateReservationStatusController],
})
export class ReservationsModule {}
