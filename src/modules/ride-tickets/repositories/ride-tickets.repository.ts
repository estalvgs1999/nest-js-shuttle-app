import { RideTicketDto } from '../dtos';
import { RideTicket } from '../schemas';

export interface RideTicketsRepository {
  create(rideReservationDto: RideTicketDto): Promise<RideTicket>;
}

export const RIDE_TICKETS_REPOSITORY = 'RideTicketsRepository';
