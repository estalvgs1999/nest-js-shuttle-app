import { RawReservationDTO } from '../../../modules/reservations/dtos';
import { Reservation } from '../../../modules/reservations/schemas';

export class ReservationCreatedEvent {
  constructor(
    public readonly rawReservation: RawReservationDTO,
    public readonly newReservation: Reservation,
  ) {}
}
