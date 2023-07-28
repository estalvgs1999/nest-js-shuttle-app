import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';
import { VehicleStatus } from '../enums';
import { VehicleAssignedEvent } from '../events';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UpdateVehicleStatusService {
  private readonly logger = new Logger(UpdateVehicleStatusService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async run(plate: string, status: VehicleStatus) {
    this.logger.log('Getting vehicle');
    const vehicle = await this.vehiclesRepository.findByPlate(plate);

    if (!vehicle)
      throw new NotFoundException(`Vehicle with plate ${plate} not found.`);

    vehicle.status = status;
    const updatedVehicle = await this.vehiclesRepository.update(plate, vehicle);
    this.logger.log('Vehicle updated');

    return updatedVehicle;
  }

  @OnEvent('vehicle.assigned')
  private async setVehicleToAssigned(payload: VehicleAssignedEvent) {
    await this.run(payload.vehiclePlate, VehicleStatus.Assigned);
  }
}
