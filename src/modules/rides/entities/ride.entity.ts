import { Booking } from '@/modules/booking/schemas';
import { RideInfo } from '../interfaces';
import { RideMode, RideStatus } from '../enums';
import { Route } from '@/modules/routes/enums';

export class Ride {
  driver: string;
  status: RideStatus;
  mode: RideMode;
  route: Route;
  firstPickUp: Date;
  bookings: Booking[];
  rideInfo: RideInfo;
}
