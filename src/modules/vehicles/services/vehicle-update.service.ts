import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateVehicleDto } from '../dtos';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';

@Injectable()
export class UpdateVehicleService {
  private readonly logger = new Logger(UpdateVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async run(vehicleId: string, updateDto: UpdateVehicleDto) {
    this.logger.log('Finding vehicle for update');

    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) {
      this.logger.log('Vehicle update failed: Vehicle not found');
      throw new NotFoundException('Vehicle not found');
    }

    const updatedVehicle = await this.vehiclesRepository.update(vehicleId, {
      ...vehicle,
      plate: updateDto.plate || vehicle.plate,
      model: updateDto.model || vehicle.model,
      capacity: updateDto.capacity || vehicle.capacity,
      status: updateDto.status || vehicle.status,
    });

    this.logger.log('Vehicle updated successfully');

    return updatedVehicle;
  }
}
