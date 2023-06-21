import { Reservation } from '../entities';
import { ReservationFilter } from '../filters';

export interface ReservationRepository {
	findAll(): Promise<Reservation[]>;
	findByFilter(filter: ReservationFilter): Promise<Reservation[]>;
	save(reservation: Reservation): Promise<void>;
}
