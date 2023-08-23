import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateVehicleDto {
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
}
