import { IsEnum, IsNotEmpty } from 'class-validator';
import { VehicleStatus } from '../enums';

export class UpdateVehicleStatusDto {
  @IsNotEmpty()
  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
