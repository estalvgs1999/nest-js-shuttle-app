import { RideReservationDto } from '../dtos';

export interface RideReservationsRepository {
  create(rideReservationDto: RideReservationDto): Promise<RideReservationDto>;
}

export const RIDE_RESERVATIONS_REPOSITORY = 'RideReservationsRepository';
