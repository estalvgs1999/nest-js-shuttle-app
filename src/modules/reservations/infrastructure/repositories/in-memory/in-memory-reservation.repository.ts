import { ReservationFilterDTO } from 'src/modules/reservations/domain/dtos';
import { Reservation } from '../../../domain/entities';
import { ReservationRepository } from '../../../domain/repositories';

export class InMemoryReservationRepository implements ReservationRepository {
	private reservations: Reservation[];

	async findAll(): Promise<Reservation[]> {
		return this.reservations;
	}

	async findByFilter(filter: ReservationFilterDTO): Promise<Reservation[]> {
		return this.reservations.filter(reservation => {
			filter.reservationId === reservation.reservationId;
		});
	}

	async save(reservation: Reservation): Promise<void> {
		this.reservations.push(reservation);
	}
}
