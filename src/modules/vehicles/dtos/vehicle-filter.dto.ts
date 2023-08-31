import { IsEnum, IsOptional, IsString } from 'class-validator';
import { VehicleStatus } from '../enums';

export class VehicleFilterDto {
  @IsOptional()
  @IsString()
  plate?: string;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}
