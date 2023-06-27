import { IsEnum, IsNotEmpty } from 'class-validator';
import { VehicleStatus } from '../enums';

export class UpdateVehicleStatusDTO {
  @IsNotEmpty()
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
