import { Reservation } from '../../../modules/reservations/schemas';
import { Route, RideType, RideMode } from '../enums';

export class RideReservationDto {
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
