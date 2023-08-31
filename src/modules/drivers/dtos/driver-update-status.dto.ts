import { IsEnum, IsNotEmpty } from 'class-validator';
import { DriverStatus } from '../enums';

export class UpdateDriverStatusDto {
  @IsNotEmpty()
  @IsEnum(DriverStatus)
  status: DriverStatus;
}
