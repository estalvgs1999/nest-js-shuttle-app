import { Body, Controller, Post } from '@nestjs/common';
import { ReservationTicketDTO } from '../../domain/dtos';
import { ReservationCreatorService } from '../../application';
import { Reservation } from '../../domain/entities';

@Controller('/api/v1/reservation')
export class ReservationPostController {
	constructor(private readonly reservationService: ReservationCreatorService) {}

	@Post()
	async create(
		@Body() reservationTicketDTO: ReservationTicketDTO,
	): Promise<Reservation> {
		return this.reservationService.create(reservationTicketDTO);
	}
}
