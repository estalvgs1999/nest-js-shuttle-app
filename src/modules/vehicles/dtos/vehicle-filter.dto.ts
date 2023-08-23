import { VehicleStatus } from '../enums';

export class VehicleFilterDto {
  plate?: string;
  status?: VehicleStatus;
}
