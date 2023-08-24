import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';
import { AssignDriversVehicleService } from '../../drivers/services';

@Injectable()
export class DeleteVehicleService {
  private readonly logger = new Logger(DeleteVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly driversVehicleService: AssignDriversVehicleService,
  ) {}

  async run(vehicleId: string) {
    this.logger.log('Finding vehicle for deletion');
    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) {
      this.logger.log('Vehicle deletion failed: Vehicle not found');
      throw new NotFoundException('Vehicle not found');
    }

    if (vehicle.driver) {
      this.logger.log('Vehicle is assigned, releasing vehicle assignation');
      await this.driversVehicleService.releaseVehicle({
        driverId: vehicle.driver['_id'],
        vehicleId: vehicleId,
      });
    }

    const result = await this.vehiclesRepository.delete(vehicleId);

    this.logger.log('Vehicle deleted successfully');

    return result;
  }
}
