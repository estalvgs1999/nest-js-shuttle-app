import { IsNotEmpty, IsString } from 'class-validator';

export class VehicleAssignmentDto {
  @IsNotEmpty()
  @IsString()
  driverId: string;

  @IsNotEmpty()
  @IsString()
  vehicleId: string;
}
