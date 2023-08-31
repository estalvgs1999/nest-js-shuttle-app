import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { VehicleDriverAssignmentService } from './vehicle-driver-assignment.service';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';

@Injectable()
export class DeleteVehicleService {
  private readonly logger = new Logger(DeleteVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly vehicleService: VehicleDriverAssignmentService,
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
      await this.vehicleService.hardDriverRelease(vehicle);
    }

    const deletedVehicle = await this.vehiclesRepository.delete(vehicleId);

    this.logger.log('Vehicle deleted successfully');

    return deletedVehicle;
  }
}
