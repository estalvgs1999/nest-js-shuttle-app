import { Inject, Injectable, Logger } from '@nestjs/common';
import { VehicleFilterDTO } from '../dtos/vehicle-filter.dto';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';

@Injectable()
export class FindVehicleService {
  private readonly logger = new Logger(FindVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async findById(id: string) {
    this.logger.log(`Finding vehicles by vehicle id ${id}`);
    return await this.vehiclesRepository.findById(id);
  }

  async findByPlate(plate: string) {
    this.logger.log(`Finding vehicles by license plate ${plate}`);
    return await this.vehiclesRepository.findByPlate(plate);
  }

  async findByFilter(filter: VehicleFilterDTO) {
    this.logger.log(`Finding vehicles by filter ${filter}`);
    return await this.vehiclesRepository.findByFilter(filter);
  }
}
