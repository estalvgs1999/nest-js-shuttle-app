import { Driver } from '../../drivers/schemas';
import { VehicleStatus } from '../enums';

export class Vehicle {
  plate: string;
  model: string;
  capacity: number;
  status: VehicleStatus;
  driver: Driver | string;
}
