import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';

export class CreateReservationDto {
  reservationId: string;
  clientEmail: string;
  client?: string;
  paymentInfo: PaymentInfo;
  passengersInfo: PassengersInfo;
  luggageInfo: LuggageInfo;
  rideTickets: string[];
}
