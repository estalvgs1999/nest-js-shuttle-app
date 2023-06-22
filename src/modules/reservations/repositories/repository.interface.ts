import { CreateReservationDTO, ReservationFilterDTO } from '../dtos';
import { Reservation } from '../schemas';

export interface ReservationsRepository {
  create(reservationDTO: CreateReservationDTO): Promise<Reservation>;
  update(
    id: string,
    reservationDTO: CreateReservationDTO,
  ): Promise<Reservation>;
  delete(id: string): Promise<any>;
  findAll(): Promise<Reservation[]>;
  findByFilter(filter: ReservationFilterDTO): Promise<Reservation[]>;
}

export const RESERVATIONS_REPOSITORY = 'ReservationsRepository';
