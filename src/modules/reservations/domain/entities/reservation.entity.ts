import { ReservationTicketDTO } from '../dtos';
import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';
import {
	ReservationStatus,
	TripType,
	mapPaymentType,
	mapRoute,
	mapTripMode,
	mapTripType,
} from '../types';
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
		rides: RideReservation[],
	) {
		this.reservationId = reservationId;
		this.clientEmail = clientEmail;
		this.status = ReservationStatus.Pending;
		this.passengersInfo = passengersInfo;
		this.luggageInfo = luggageInfo;
		this.paymentInfo = paymentInfo;
		this.rides = rides;
	}

	public static create(reservationTicket: ReservationTicketDTO): Reservation {
		const { reservationId, email } = reservationTicket;

		const passengersInfo: PassengersInfo = {
			adults: reservationTicket.adults,
			children: reservationTicket.children,
			infants: reservationTicket.infants,
		};

		const luggageInfo: LuggageInfo = {
			boosterSeats: reservationTicket.boosterSeats,
			bags: reservationTicket.bags,
			surfboards: reservationTicket.surfboards,
		};

		const paymentInfo: PaymentInfo = {
			paymentType: mapPaymentType(reservationTicket.paymentType),
			isPaid: Boolean(reservationTicket.isPaid),
		};

		const rideReservations: RideReservation[] =
			this.getRideReservations(reservationTicket);

		const reservation = new Reservation(
			reservationId,
			email,
			passengersInfo,
			luggageInfo,
			paymentInfo,
			rideReservations,
		);

		return reservation;
	}

	private static getRideReservations(
		reservationTicket: ReservationTicketDTO,
	): RideReservation[] {
		const rides: RideReservation[] = [];

		const tripType = mapTripType(reservationTicket.tripType);
		const tripMode = mapTripMode(reservationTicket.vehicleType);
		const route = mapRoute(reservationTicket.route);

		const arrivalRide = RideReservation.createRideReservation(
			tripType,
			tripMode,
			route,
			reservationTicket,
		);
		rides.push(arrivalRide);

		if (tripType == TripType.RoundTrip) {
			const departureRide = RideReservation.createRideReservation(
				tripType,
				tripMode,
				route,
				reservationTicket,
				false,
			);
			rides.push(departureRide);
		}

		return rides;
	}
}
