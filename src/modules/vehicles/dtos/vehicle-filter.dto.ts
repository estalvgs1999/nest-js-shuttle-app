import { VehicleStatus } from '../enums';

export class VehicleFilterDTO {
  plate?: string;
  status?: VehicleStatus;
}
