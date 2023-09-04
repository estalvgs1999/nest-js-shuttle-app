import {
  ClientInfo,
  LuggageInfo,
  PassengersInfo,
  PaymentInfo,
  Ticket,
} from '../interfaces';

export class CreateBookingDto {
  bookingNumber: string;
  clientInfo: ClientInfo;
  paymentInfo: PaymentInfo;
  passengersInfo: PassengersInfo;
  luggageInfo: LuggageInfo;
  ticket: Ticket;
}
