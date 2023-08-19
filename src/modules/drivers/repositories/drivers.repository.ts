import { CreateDriverDTO, DriverFilterDTO } from '../dtos';

export interface DriversRepository {
  create(createDriverDTO: CreateDriverDTO): Promise<any>;
  findById(driverId: string): Promise<any>;
  findByFilter(filter: DriverFilterDTO): Promise<any[]>;
}

export const DRIVERS_REPOSITORY = 'ReservationsRepository';
