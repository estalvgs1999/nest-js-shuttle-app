import { CreateReservationDTO } from '../dtos';
import { Reservation } from '../entities';

export interface ReservationsRepository {
  create(reservationDTO: CreateReservationDTO): Promise<Reservation>;
  findById(reservationId: string): Promise<Reservation>;
}

export const RESERVATIONS_REPOSITORY = 'ReservationsRepository';
