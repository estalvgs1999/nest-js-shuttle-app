import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReservationStatus } from '../enums';

export class ReservationUpdateStatusDTO {
  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;
}
