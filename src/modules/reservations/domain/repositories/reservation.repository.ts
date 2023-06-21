import { ReservationFilterDTO } from '../dtos';
import { Reservation } from '../entities';

export interface ReservationRepository {
	findAll(): Promise<Reservation[]>;
	findByFilter(filter: ReservationFilterDTO): Promise<Reservation[]>;
	save(reservation: Reservation): Promise<void>;
}
