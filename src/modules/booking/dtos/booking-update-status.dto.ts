import { IsEnum, IsNotEmpty } from 'class-validator';
import { BookingStatus } from '../enums';

export class UpdateBookingStatusDto {
  @IsNotEmpty()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
