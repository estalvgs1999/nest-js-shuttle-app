import { Route, TripMode, TripType } from '../types';

export class ReservationFilterDTO {
	email?: string;
	reservationId?: string;
	route?: Route;
	pickUpDate?: Date;
	tripMode?: TripMode;
	tripType?: TripType;
}
