import { Injectable } from '@nestjs/common';
import { ReservationTicketDTO } from '../domain/dtos';
import { ReservationRepository } from '../domain/repositories';
import { Reservation, RideReservation } from '../domain/entities';
import { LuggageInfo, PassengersInfo, PaymentInfo } from '../domain/interfaces';
import { mapPaymentType } from '../domain/types';

@Injectable()
export class ReservationCreatorService {
	constructor(private readonly repository: ReservationRepository) {}

	async create(
		reservationTicketDTO: ReservationTicketDTO,
	): Promise<Reservation> {
		const reservation = Reservation.create(reservationTicketDTO);
		await this.repository.save(reservation);
		return reservation;
	}
}
