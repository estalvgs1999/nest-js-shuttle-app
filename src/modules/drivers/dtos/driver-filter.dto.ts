import { IsOptional, IsString } from 'class-validator';
import { DriverStatus } from '../enums';

export class DriverFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  plate?: string;

  @IsOptional()
  @IsString()
  status?: DriverStatus;
}
