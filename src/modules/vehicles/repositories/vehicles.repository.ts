import { CreateVehicleDTO } from '../dtos';
import { VehicleFilterDTO } from '../dtos/vehicle-filter.dto';
import { Vehicle } from '../schemas';

export interface VehiclesRepository {
  create(createVehicleDTO: CreateVehicleDTO): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle>;
  findByPlate(plate: string): Promise<Vehicle>;
  findByFilter(filter: VehicleFilterDTO): Promise<Vehicle[]>;
  update(id: string, vehicle: Vehicle): Promise<Vehicle>;
  delete(id: string): Promise<Vehicle>;
}

export const VEHICLES_REPOSITORY = 'VehiclesRepository';
