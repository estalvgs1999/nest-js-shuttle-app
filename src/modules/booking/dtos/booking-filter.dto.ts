import { BookingStatus } from '../enums';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { RideMode, RideType } from '@/modules/rides/enums';
import { Route } from '@/modules/routes/enums';
import { Type } from 'class-transformer';

export class BookingFilterDto {
  @IsOptional()
  @IsString()
  client?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(Route)
  route?: Route;

  @IsOptional()
  @IsEnum(RideType)
  type?: RideType;

  @IsOptional()
  @IsEnum(RideMode)
  mode?: RideMode;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;
}
