import { CreateReservationDto } from '../dtos';
import { Reservation } from '../schemas';

export interface ReservationsRepository {
  create(reservationDto: CreateReservationDto): Promise<Reservation>;
  findById(reservationId: string): Promise<Reservation>;
  findAll(): Promise<Reservation[]>;
  update(id: string, reservation: Reservation): Promise<Reservation>;
}

export const RESERVATIONS_REPOSITORY = 'ReservationsRepository';
