import { RideMode } from '../enums';
import { Route } from '@/modules/routes/enums';

export class CreateRideDto {
  driverId: string;
  mode: RideMode;
  route: Route;
  availableSeats: number;
  date: Date;
}
