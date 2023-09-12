import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class DriverRidesFilterDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  from: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  to: Date;
}
