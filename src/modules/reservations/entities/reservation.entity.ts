import { ReservationStatus } from '../enums';
import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';

export class Reservation {
  reservationId: string;
  clientEmail: string;
  status: ReservationStatus;
  passengersInfo: PassengersInfo;
  luggageInfo: LuggageInfo;
  paymentInfo: PaymentInfo;
  createdAt: Date;
}
