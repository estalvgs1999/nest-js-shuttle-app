import { FlightInfo } from '../interfaces';
import { Route, TripMode, TripType } from '../types';

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
}
