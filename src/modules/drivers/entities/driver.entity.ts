import { User } from '../../users/entities';
import { Vehicle } from '../../vehicles/entities';
import { DriverStatus } from '../enums';

export class Driver {
  user: User;
  status: DriverStatus;
  vehicle: Vehicle;
}
