import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateVehicleDTO } from '../dtos';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';

@Injectable()
export class UpdateVehicleService {
  private readonly logger = new Logger(UpdateVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async run(id: string, dto: UpdateVehicleDTO) {
    this.logger.log('Finding vehicle for update');
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      this.logger.log('Vehicle update failed: Vehicle not found');
      throw new NotFoundException('Vehicle not found');
    }

    const updatedVehicle = await this.vehiclesRepository.update(id, {
      ...vehicle,
      plate: dto.plate || vehicle.plate,
      model: dto.model || vehicle.model,
      capacity: dto.capacity || vehicle.capacity,
      status: dto.status || vehicle.status,
    });

    this.logger.log('Vehicle updated successfully');

    return updatedVehicle;
  }
}
