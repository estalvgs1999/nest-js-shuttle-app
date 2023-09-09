import { Driver } from '@/modules/drivers/schemas';
import { Ride } from '../schemas';

export type DriverRides = {
  driver: Driver;
  rides: Ride[];
};
