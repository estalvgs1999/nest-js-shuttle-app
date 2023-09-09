import { Driver } from '@/modules/drivers/schemas';

export type DriverSuggestion = {
  driver: Driver;
  rideId?: string;
};
