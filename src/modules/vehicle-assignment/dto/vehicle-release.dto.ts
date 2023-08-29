import { IsNotEmpty, IsString } from 'class-validator';

export class VehicleReleaseDto {
  @IsNotEmpty()
  @IsString()
  driverId: string;

  @IsNotEmpty()
  @IsString()
  vehicleId: string;
}
