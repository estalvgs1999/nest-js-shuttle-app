import { Reservation } from '../../reservations/schemas';
import { RideMode, RideType, Route } from '../enums';

export class RideReservation {
  route: Route;
  type: RideType;
  mode: RideMode;
  flightNumber?: string;
  pickUpLocation: string;
  pickUpDate: Date;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: Date;
  dropOffTime: string;
  reservation: Reservation;
}
