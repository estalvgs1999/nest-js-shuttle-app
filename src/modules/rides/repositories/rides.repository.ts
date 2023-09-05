import { Ride } from '../schemas';

export interface RidesRepository {
  create(ride: Ride): Promise<Ride>;
  addBooking(rideId: string, bookingId: string): Promise<Ride>;
  cancelBooking(bookingId: string): Promise<Ride>;
  assignDriver(rideId: string, driverId: string): Promise<Ride>;
  findById(rideId: string): Promise<Ride>;
  findAll(): Promise<Ride[]>;
  update(rideId: string, ride: Ride): Promise<Ride>;
}

export const RIDES_REPOSITORY = 'RidesRepository';
