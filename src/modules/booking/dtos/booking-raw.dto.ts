import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RawBookingDto {
  @IsNotEmpty()
  @IsString()
  readonly reservationId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  readonly route: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(2)
  readonly tripType: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(3)
  readonly vehicleType: number;

  @IsNotEmpty()
  @IsInt()
  readonly adults: number;

  @IsNotEmpty()
  @IsInt()
  readonly children: number;

  @IsNotEmpty()
  @IsInt()
  readonly babySeats: number;

  @IsNotEmpty()
  @IsInt()
  readonly boosterSeats: number;

  @IsNotEmpty()
  @IsInt()
  readonly bags: number;

  @IsNotEmpty()
  @IsInt()
  readonly surfboards: number;

  @IsOptional()
  @IsString()
  readonly arrivalFlight: string;

  @IsNotEmpty()
  @IsString()
  readonly arrivalPickupLocation: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly arrivalPickupDate: Date;

  @IsNotEmpty()
  @IsString()
  readonly arrivalPickupTime: string;

  @IsNotEmpty()
  @IsString()
  readonly arrivalDropOffLocation: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly arrivalDropOffDate: Date;

  @IsNotEmpty()
  @IsString()
  readonly arrivalDropOffTime: string;

  @IsOptional()
  @IsString()
  readonly departureFlight: string;

  @IsOptional()
  @IsString()
  readonly departurePickupLocation: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly departurePickupDate: Date;

  @IsOptional()
  @IsString()
  readonly departurePickupTime: string;

  @IsOptional()
  @IsString()
  readonly departureDropOffLocation: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly departureDropOffDate: Date;

  @IsOptional()
  @IsString()
  readonly departureDropOffTime: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(2)
  readonly paymentType: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1)
  readonly isPaid: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
