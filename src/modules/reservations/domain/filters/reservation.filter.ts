import { Route, TripMode, TripType } from '../types';

export interface ReservationFilter {
	email?: string;
	reservationId?: string;
	route?: Route;
	pickUpDate?: Date;
	tripMode?: TripMode;
	tripType?: TripType;
}
