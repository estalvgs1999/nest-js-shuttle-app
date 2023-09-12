import { Booking } from '@/modules/booking/schemas';
import { RideMode, RideStatus } from '../enums';
import { Route } from '@/modules/routes/enums';
import { v4 as uuidv4 } from 'uuid';

export class Ride {
  driver: string;
  status: RideStatus;
  mode: RideMode;
  route: Route;
  availableSeats: number;
  date?: Date;
  bookings: Booking[];
  mapRoom: string;
  start?: Date;
  finish?: Date;
  duration?: string;

  public constructor(
    driver: string,
    mode: RideMode,
    route: Route,
    availableSeats: number,
    date: Date,
  ) {
    this.driver = driver;
    this.status = RideStatus.Pending;
    this.mode = mode;
    this.route = route;
    this.availableSeats = availableSeats;
    this.mapRoom = `map.${uuidv4()}`;
    this.date = date;
    this.bookings = [];
  }
}
