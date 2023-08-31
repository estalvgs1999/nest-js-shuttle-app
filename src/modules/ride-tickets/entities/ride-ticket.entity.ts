import { RideMode, RideType, Route } from '../enums';

export class RideTicket {
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
}
