import { Reservation } from '../../../domain/entities';
import { ReservationFilter } from '../../../domain/filters';
import { ReservationRepository } from '../../../domain/repositories';

export class InMemoryReservationRepository implements ReservationRepository {
	private reservations: Reservation[];

	async findAll(): Promise<Reservation[]> {
		return this.reservations;
	}

	async findByFilter(filter: ReservationFilter): Promise<Reservation[]> {
		return this.reservations.filter(reservation => {
			filter.reservationId === reservation.reservationId;
		});
	}

	async save(reservation: Reservation): Promise<void> {
		this.reservations.push(reservation);
	}
}
