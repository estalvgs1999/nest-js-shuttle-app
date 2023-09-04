import {
  ClientInfo,
  LuggageInfo,
  PassengersInfo,
  PaymentInfo,
  Ticket,
} from '../interfaces';
import { BookingStatus } from '../enums';

export class Booking {
  bookingNumber: string;
  status: BookingStatus;
  clientInfo: ClientInfo;
  passengersInfo: PassengersInfo;
  luggageInfo: LuggageInfo;
  paymentInfo: PaymentInfo;
  ticket: Ticket;
}
