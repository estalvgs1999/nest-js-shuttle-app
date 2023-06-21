import { RideOptionsDTO } from '../dtos/ride-options.dto';
import { FlightInfo } from '../interfaces';
import {
	FlightType,
	Route,
	TripMode,
	TripType,
	getOppositeRoute,
} from '../types';

export class RideReservation {
	route: Route;
	tripType: TripType;
	tripMode: TripMode;
	pickUpLocation: string;
	pickUpDate: Date;
	dropOffLocation: string;
	dropOffDate: Date;
	flightInfo: FlightInfo;

	constructor(
		route: Route,
		type: TripType,
		mode: TripMode,
		pickUpLocation: string,
		pickUpDate: Date,
		dropOffLocation: string,
		dropOffDate: Date,
		flightInfo: FlightInfo,
	) {
		this.route = route;
		this.tripType = type;
		this.tripMode = mode;
		this.pickUpLocation = pickUpLocation;
		this.pickUpDate = pickUpDate;
		this.dropOffLocation = dropOffLocation;
		this.dropOffDate = dropOffDate;
		this.flightInfo = flightInfo;
	}

	public static create(
		route: Route,
		type: TripType,
		mode: TripMode,
		pickupLocation: string,
		pickupDate: Date,
		dropOffLocation: string,
		dropOffDate: Date,
		flightNumber: string,
		flightType: FlightType,
	): RideReservation {
		return new RideReservation(
			route,
			type,
			mode,
			pickupLocation,
			pickupDate,
			dropOffLocation,
			dropOffDate,
			{ flightNumber, flightType },
		);
	}

	public static createRideReservation(
		type: TripType,
		mode: TripMode,
		route: Route,
		rideOptions: RideOptionsDTO,
		isArrival = true,
	): RideReservation {
		const rideReservation = RideReservation.create(
			isArrival ? route : getOppositeRoute(route),
			type,
			mode,
			isArrival
				? rideOptions.arrivalPickupLocation
				: rideOptions.departurePickupLocation,
			isArrival
				? rideOptions.arrivalPickupDate
				: rideOptions.departurePickupDate,
			isArrival
				? rideOptions.arrivalDropOffLocation
				: rideOptions.departureDropOffLocation,
			isArrival
				? rideOptions.arrivalDropOffDate
				: rideOptions.departureDropOffDate,
			isArrival ? rideOptions.arrivalFlight : rideOptions.departureFlight,
			isArrival ? FlightType.Arrival : FlightType.Departure,
		);

		return rideReservation;
	}
}
