import { RideMode } from '@/modules/rides/enums';
import { Route } from '@/modules/routes/enums';

export class DriverRideDetailDto {
  date: Date;
  route: Route;
  tripType: RideMode;
  user: {
    _id: string;
    name: string;
    lastName: string;
    profilePicture?: string;
  };
}
