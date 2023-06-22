import { ReservationStatus } from '../enums';

export class ReservationFilterDTO {
  email?: string;
  reservationId?: string;
  status?: ReservationStatus;
  createdAt?: Date;
}
