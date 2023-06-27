import { CreateVehicleDTO } from '../dtos';
import { Vehicle } from '../entities';

export interface VehiclesRepository {
  create(createVehicleDTO: CreateVehicleDTO): Promise<Vehicle>;
  findByPlate(plate: string): Promise<Vehicle>;
}

export const VEHICLES_REPOSITORY = 'VehiclesRepository';
