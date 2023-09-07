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
  firstPickUp?: Date;
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
  ) {
    this.driver = driver;
    this.status = RideStatus.Pending;
    this.mode = mode;
    this.route = route;
    this.availableSeats = availableSeats;
    this.mapRoom = `map.${uuidv4()}`;
    this.bookings = [];
  }

  public hasAvailableSeats(passengers: number) {
    return this.availableSeats - passengers > 0;
  }

  public enrollPassengers(passengers: number) {
    if (this.availableSeats <= 0) return;
    if (this.availableSeats - passengers < 0) return;
    this.availableSeats -= passengers;
  }

  public startRide() {
    this.status = RideStatus.OnGoing;
    this.start = new Date();
  }

  public finishRide() {
    this.status = RideStatus.Completed;
    this.finish = new Date();
    this.calculateRideDuration();
  }

  private calculateRideDuration() {
    const milliseconds = this.finish.getTime() - this.start.getTime();
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${hours} h ${minutes} min`;
  }
}
