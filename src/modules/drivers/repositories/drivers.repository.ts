import { CreateDriverDTO } from '../dtos';

export interface DriversRepository {
  create(createDriverDTO: CreateDriverDTO): Promise<any>;
  findAll(): Promise<any[]>;
}

export const DRIVERS_REPOSITORY = 'ReservationsRepository';
