import {
  AssignDriversVehicleDTO,
  CreateDriverDTO,
  DriverFilterDTO,
} from '../dtos';
import { Driver } from '../schemas';

export interface DriversRepository {
  create(createDriverDTO: CreateDriverDTO): Promise<Driver>;
  findById(driverId: string): Promise<Driver>;
  findByFilter(filter: DriverFilterDTO): Promise<Driver[]>;
  assignVehicle(assignationDTO: AssignDriversVehicleDTO): Promise<Driver>;
  releaseVehicle(driverId: string): Promise<Driver>;
}

export const DRIVERS_REPOSITORY = 'ReservationsRepository';
