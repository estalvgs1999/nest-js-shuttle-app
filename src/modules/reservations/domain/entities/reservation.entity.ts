import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';
import { ReservationStatus } from '../types';
import { RideReservation } from './ride-reservation.entity';

export class Reservation {
	reservationId: string;
	clientEmail: string;
	status: ReservationStatus;
	passengersInfo: PassengersInfo;
	luggageInfo: LuggageInfo;
	paymentInfo: PaymentInfo;
	rides: RideReservation[];

	constructor(
		reservationId: string,
		clientEmail: string,
		passengersInfo: PassengersInfo,
		luggageInfo: LuggageInfo,
		paymentInfo: PaymentInfo,
	) {
		this.reservationId = reservationId;
		this.clientEmail = clientEmail;
		this.status = ReservationStatus.Pending;
		this.passengersInfo = passengersInfo;
		this.luggageInfo = luggageInfo;
		this.paymentInfo = paymentInfo;
		this.rides = [];
	}
}
