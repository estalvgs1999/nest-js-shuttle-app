import { Reservation } from '../schemas/reservation.schema';

export interface ReservationsRepository {
  createReservation(reservation): Promise<Reservation>;
}

export const RESERVATIONS_REPOSITORY = 'ReservationsRepository';
