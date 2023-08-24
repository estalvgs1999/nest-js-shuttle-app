import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { AssignDriversVehicleDTO } from '../dtos';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VehicleAssignedEvent } from 'src/modules/vehicles/events';

@Injectable()
export class AssignDriversVehicleService {
  private readonly logger = new Logger(AssignDriversVehicleService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async assignVehicle(assignationDTO: AssignDriversVehicleDTO) {
    const { driverId, vehicleId } = assignationDTO;
    const driver = await this.driversRepository.assignVehicle(assignationDTO);
    this.eventEmitter.emit(
      'vehicle.assigned',
      new VehicleAssignedEvent(vehicleId, driverId),
    );
    return driver;
  }

  async releaseVehicle(assignationDTO: AssignDriversVehicleDTO) {
    const { driverId, vehicleId } = assignationDTO;
    const driver = await this.driversRepository.releaseVehicle(driverId);
    this.eventEmitter.emit(
      'vehicle.released',
      new VehicleAssignedEvent(vehicleId, driverId),
    );
    return driver;
  }
}
