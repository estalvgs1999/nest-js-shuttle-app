import { ReservationStatus } from '../enums';

export class ReservationFilterDto {
  email?: string;
  reservationId?: string;
  status?: ReservationStatus;
  createdAt?: Date;
}
