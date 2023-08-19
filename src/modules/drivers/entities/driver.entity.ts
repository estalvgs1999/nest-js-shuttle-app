import { User } from '../../../modules/users/entities';
import { Vehicle } from '../../../modules/vehicles/entities';
import { DriverStatus } from '../enums';

export class Driver {
  user: User;
  status: DriverStatus;
  vehicle: Vehicle;
}
