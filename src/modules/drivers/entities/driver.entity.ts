import { DriverStatus } from '../enums';
import { User } from '../../users/entities';
import { Vehicle } from '../../vehicles/entities';

export class Driver {
  user: User;
  status: DriverStatus;
  vehicle: Vehicle;
}
