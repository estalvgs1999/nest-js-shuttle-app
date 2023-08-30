import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateVehicleDto } from '../dtos';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';
import { VehicleDriverAssignmentService } from './vehicle-driver-assignment.service';
import { VehicleStatus } from '../enums';
import { Vehicle } from '../entities';

@Injectable()
export class UpdateVehicleService {
  private readonly logger = new Logger(UpdateVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly vehicleService: VehicleDriverAssignmentService,
  ) {}

  async run(vehicleId: string, updateDto: UpdateVehicleDto) {
    this.logger.log('Finding vehicle for update');

    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) {
      this.logger.log('Vehicle update failed: Vehicle not found');
      throw new NotFoundException('Vehicle not found');
    }

    if (updateDto.status) this.handleStatusChange(vehicle, updateDto.status);

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

  private async handleStatusChange(vehicle: Vehicle, status: VehicleStatus) {
    if (!vehicle.driver) {
      this.logger.log('Vehicle does not have a driver to release');
      return;
    }

    if (status === VehicleStatus.Assigned) {
      this.logger.log('The change of state of the vehicle must not be managed');
      return;
    }

    await this.vehicleService.hardDriverRelease(vehicle);
  }
}
