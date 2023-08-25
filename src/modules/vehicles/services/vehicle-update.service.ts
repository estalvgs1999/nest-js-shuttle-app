import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateVehicleDTO } from '../dtos';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';
import { VehicleStatus } from '../enums';
import { Vehicle } from '../schemas';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UpdateVehicleService {
  private readonly logger = new Logger(UpdateVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async run(id: string, dto: UpdateVehicleDTO) {
    this.logger.log('Finding vehicle for update');
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      this.logger.log('Vehicle update failed: Vehicle not found');
      throw new NotFoundException('Vehicle not found');
    }

    if (dto.status) await this.handleStatusChange(vehicle);

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

  private async handleStatusChange(vehicle: Vehicle) {
    if (vehicle.status !== VehicleStatus.Assigned) {
      this.logger.log('The change of state of the vehicle must not be managed');
      return;
    }

    const driverId = vehicle.driver['_id'];
    const vehicleId = vehicle['_id'];

    this.eventEmitter.emit('driver.released', { driverId, vehicleId });
  }
}
