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

	@IsNotEmpty()
	@IsString()
	readonly arrivalPickupLocation: string;

	@IsNotEmpty()
	@IsDate()
	readonly arrivalPickupDate: Date;

	@IsNotEmpty()
	@IsString()
	readonly arrivalPickupTime: string;

	@IsNotEmpty()
	@IsString()
	readonly arrivalDropOffLocation: string;

	@IsNotEmpty()
	@IsDate()
	readonly arrivalDropOffDate: Date;

	@IsNotEmpty()
	@IsString()
	readonly arrivalDropOffTime: string;

	@IsOptional()
	@IsString()
	readonly departureFlight: string;

	@IsNotEmpty()
	@IsString()
	readonly departurePickupLocation: string;

	@IsNotEmpty()
	@IsDate()
	readonly departurePickupDate: Date;

	@IsNotEmpty()
	@IsString()
	readonly departurePickupTime: string;

	@IsNotEmpty()
	@IsString()
	readonly departureDropOffLocation: string;

	@IsNotEmpty()
	@IsDate()
	readonly departureDropOffDate: Date;

	@IsNotEmpty()
	@IsString()
	readonly departureDropOffTime: string;

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
