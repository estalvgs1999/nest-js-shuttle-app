import { CreateDriverDto, DriverFilterDto } from '../dtos';
import { Driver } from '../schemas';

export interface DriversRepository {
  create(createDriverDto: CreateDriverDto): Promise<Driver>;
  findByUserId(userId: string): Promise<Driver>;
  findById(driverId: string): Promise<Driver>;
  findByFilter(filter: DriverFilterDto): Promise<Driver[]>;
  assignVehicle(driverId: string, vehicleId: string): Promise<Driver>;
  releaseVehicle(driverId: string): Promise<Driver>;
  delete(driverId: string): Promise<any>;
}

export const DRIVERS_REPOSITORY = 'ReservationsRepository';
