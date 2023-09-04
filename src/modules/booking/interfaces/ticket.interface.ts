import { RideMode, RideType } from '@/modules/rides/enums';
import { Route } from '@/modules/routes/enums';

export interface Ticket {
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
