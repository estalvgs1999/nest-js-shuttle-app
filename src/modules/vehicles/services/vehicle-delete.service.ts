import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';

@Injectable()
export class DeleteVehicleService {
  private readonly logger = new Logger(DeleteVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async run(vehicleId: string) {
    this.logger.log('Finding vehicle for deletion');
    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) {
      this.logger.log('Vehicle deletion failed: Vehicle not found');
      throw new NotFoundException('Vehicle not found');
    }

    const deletedVehicle = await this.vehiclesRepository.delete(vehicleId);

    this.logger.log('Vehicle deleted successfully');

    return deletedVehicle;
  }
}
