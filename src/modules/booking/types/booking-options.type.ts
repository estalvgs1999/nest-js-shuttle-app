import { RideMode, RideType } from '@/modules/rides/enums';
import { Route } from '@/modules/routes/enums';

export type BookingOptions = {
  route: Route;
  type: RideType;
  mode: RideMode;
};
