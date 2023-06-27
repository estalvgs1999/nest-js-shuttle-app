import { RawReservationDTO } from 'src/modules/reservations/dtos';
import { Reservation } from 'src/modules/reservations/schemas';

export class ReservationCreatedEvent {
  constructor(
    public readonly rawReservation: RawReservationDTO,
    public readonly newReservation: Reservation,
  ) {}
}
