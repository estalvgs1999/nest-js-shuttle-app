import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';
import { ReservationStatus } from '../enums';
import { RideTicket } from '@/modules/ride-tickets/entities';

export class Reservation {
  reservationId: string;
  clientEmail: string;
  status: ReservationStatus;
  passengersInfo: PassengersInfo;
  luggageInfo: LuggageInfo;
  paymentInfo: PaymentInfo;
  rideTickets: RideTicket[];
}
