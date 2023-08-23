import { RawReservationDto } from '../../reservations/dtos';
import { Reservation } from '../../reservations/schemas';

export class ReservationCreatedEvent {
  constructor(
    public readonly rawReservation: RawReservationDto,
    public readonly newReservation: Reservation,
  ) {}
}
