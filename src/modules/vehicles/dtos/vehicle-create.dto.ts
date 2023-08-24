import { IsNotEmpty, IsString, IsInt, Min, Max, IsEnum } from 'class-validator';
import { VehicleStatus } from '../enums';

export class CreateVehicleDTO {
  @IsNotEmpty()
  @IsString()
  readonly plate: string;

  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(50)
  readonly capacity: number;

  @IsNotEmpty()
  @IsEnum(VehicleStatus)
  readonly status: VehicleStatus;
}
