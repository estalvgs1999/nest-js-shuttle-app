import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Vehicle } from '../entities';
import { VehicleFilterDto } from '../dtos/vehicle-filter.dto';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';

@Injectable()
export class FindVehicleService {
  private readonly logger = new Logger(FindVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async findById(vehicleId: string): Promise<Vehicle> {
    this.logger.log(`Searching for vehicle with ID: ${vehicleId}`);
    const vehicle = await this.vehiclesRepository.findById(vehicleId);
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async findByPlate(licensePlate: string): Promise<Vehicle> {
    this.logger.log(`Searching for vehicle with license plate ${licensePlate}`);
    const vehicle = await this.vehiclesRepository.findByLicensePlate(
      licensePlate,
    );
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async findByFilter(filterDto: VehicleFilterDto): Promise<Vehicle[]> {
    this.logger.log(`Searching for vehicles`);
    return await this.vehiclesRepository.findByFilter(filterDto);
  }
}
