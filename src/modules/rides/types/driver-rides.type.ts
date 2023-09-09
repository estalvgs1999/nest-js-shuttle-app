import { Ride } from '../schemas';

export type DriverRides = {
  driverId: string;
  rides: Ride[];
};
