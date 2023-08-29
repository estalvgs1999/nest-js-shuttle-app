import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReservationStatus } from '../enums';

export class ReservationUpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;
}
