import { Reservation } from '../entities';
import { ReservationFilter } from '../filters';

export interface ReservationRepository {
	findAll(): Promise<Reservation[]>;
	findByFilter(filter: Reservation): Promise<Reservation[]>;
	save(reservation: ReservationFilter): Promise<void>;
}
