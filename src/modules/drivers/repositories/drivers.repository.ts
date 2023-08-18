import { CreateDriverDTO } from '../dtos';

export interface DriversRepository {
  create(createDriverDTO: CreateDriverDTO);
}

export const DRIVERS_REPOSITORY = 'ReservationsRepository';
