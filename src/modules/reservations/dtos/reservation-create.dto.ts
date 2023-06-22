import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';

export class CreateReservationDTO {
  reservationId: string;
  clientEmail: string;
  paymentInfo: PaymentInfo;
  passengersInfo: PassengersInfo;
  luggageInfo: LuggageInfo;
}
