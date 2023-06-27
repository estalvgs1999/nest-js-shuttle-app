import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateVehicleDTO {
  @IsNotEmpty()
  @IsString()
  readonly plate: string;

  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(30)
  readonly capacity: number;
}
