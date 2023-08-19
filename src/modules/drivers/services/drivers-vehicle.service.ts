import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { AssignDriversVehicleDTO } from '../dtos';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VehicleAssignedEvent } from 'src/modules/vehicles/events';

@Injectable()
export class DriversVehicleService {
  private readonly logger = new Logger(DriversVehicleService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async assignVehicle(assignationDTO: AssignDriversVehicleDTO) {
    const driver = await this.driversRepository.assignVehicle(assignationDTO);
    this.eventEmitter.emit(
      'vehicle.assigned',
      new VehicleAssignedEvent(assignationDTO.vehicleId),
    );
    return driver;
  }

  async releaseVehicle(assignationDTO: AssignDriversVehicleDTO) {
    const { driverId, vehicleId } = assignationDTO;
    const driver = await this.driversRepository.releaseVehicle(driverId);
    this.eventEmitter.emit(
      'vehicle.released',
      new VehicleAssignedEvent(vehicleId),
    );
    return driver;
  }
}
