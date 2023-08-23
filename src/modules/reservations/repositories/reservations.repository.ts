import { CreateReservationDto } from '../dtos';
import { Reservation } from '../entities';

export interface ReservationsRepository {
  create(reservationDto: CreateReservationDto): Promise<Reservation>;
  findById(reservationId: string): Promise<Reservation>;
  update(id: string, reservation: Reservation): Promise<Reservation>;
}

export const RESERVATIONS_REPOSITORY = 'ReservationsRepository';
