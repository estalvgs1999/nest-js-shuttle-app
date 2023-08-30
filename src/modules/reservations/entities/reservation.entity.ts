import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';
import { ReservationStatus } from '../enums';

export class Reservation {
  reservationId: string;
  clientEmail: string;
  status: ReservationStatus;
  passengersInfo: PassengersInfo;
  luggageInfo: LuggageInfo;
  paymentInfo: PaymentInfo;
  createdAt: Date;
}
