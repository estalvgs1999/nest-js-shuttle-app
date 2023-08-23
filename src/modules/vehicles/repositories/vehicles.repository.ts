import { CreateVehicleDto } from '../dtos';
import { VehicleFilterDto } from '../dtos/vehicle-filter.dto';
import { Vehicle } from '../entities';

export interface VehiclesRepository {
  create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle>;
  findByPlate(plate: string): Promise<Vehicle>;
  findByFilter(filter: VehicleFilterDto): Promise<Vehicle[]>;
  update(id: string, vehicle: Vehicle): Promise<Vehicle>;
}

export const VEHICLES_REPOSITORY = 'VehiclesRepository';
