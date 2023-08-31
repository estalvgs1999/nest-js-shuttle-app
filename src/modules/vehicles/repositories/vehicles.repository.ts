import { CreateVehicleDto } from '../dtos';
import { Vehicle } from '../schemas';
import { VehicleFilterDto } from '../dtos/vehicle-filter.dto';
import { VehicleStatus } from '../enums';

export interface VehiclesRepository {
  create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
  findById(vehicleId: string): Promise<Vehicle>;
  findByLicensePlate(licensePlate: string): Promise<Vehicle>;
  findByFilter(filterDto: VehicleFilterDto): Promise<Vehicle[]>;
  update(vehicleId: string, vehicle: Vehicle): Promise<Vehicle>;
  delete(vehicleId: string): Promise<Vehicle>;
  releaseVehicle(vehicleId: string, status: VehicleStatus): Promise<Vehicle>;
}

export const VEHICLES_REPOSITORY = 'VehiclesRepository';
