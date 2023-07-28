import { RideReservationDTO } from '../dtos';

export interface RideReservationsRepository {
  create(rideReservationDTO: RideReservationDTO): Promise<RideReservationDTO>;
}

export const RIDE_RESERVATIONS_REPOSITORY = 'RideReservationsRepository';
