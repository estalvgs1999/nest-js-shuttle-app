import { RawReservationDto } from '../../../modules/reservations/dtos';
import { Reservation } from '../../../modules/reservations/schemas';

export class ReservationCreatedEvent {
  constructor(
    public readonly rawReservation: RawReservationDto,
    public readonly newReservation: Reservation,
  ) {}
}
