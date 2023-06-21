import {
	IsDate,
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsPositive,
	IsString,
	Max,
	Min,
} from 'class-validator';

export class ReservationTicketDTO {
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
	@IsPositive()
	readonly adults: number;

	@IsNotEmpty()
	@IsInt()
	@IsPositive()
	readonly children: number;

	@IsNotEmpty()
	@IsInt()
	@IsPositive()
	readonly infants: number;

	@IsNotEmpty()
	@IsInt()
	@IsPositive()
	readonly boosterSeats: number;

	@IsNotEmpty()
	@IsInt()
	@IsPositive()
	readonly bags: number;

	@IsNotEmpty()
	@IsInt()
	@IsPositive()
	readonly surfboards: number;

	@IsOptional()
	@IsString()
	readonly arrivalFlight: string;

	@IsOptional()
	@IsString()
	readonly departureFlight: string;

	@IsNotEmpty()
	@IsString()
	readonly pickupLocation: string;

	@IsNotEmpty()
	@IsDate()
	readonly pickupDate: Date;

	@IsNotEmpty()
	@IsString()
	readonly pickupTime: string;

	@IsNotEmpty()
	@IsString()
	readonly dropOffLocation: string;

	@IsNotEmpty()
	@IsDate()
	readonly dropOffDate: Date;

	@IsNotEmpty()
	@IsString()
	readonly dropOffTime: string;

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
	@IsPhoneNumber()
	readonly phone: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string;
}
