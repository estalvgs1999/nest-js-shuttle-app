import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './repository.interface';
import { Reservation } from '../schemas/reservation.schema';

@Injectable()
export class MongoReservationsRepository implements ReservationsRepository {
  createReservation(reservation: any): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }
}
