import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { AssignDriversVehicleDto } from '../dtos';
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

  async assignVehicle(assignationDto: AssignDriversVehicleDto) {
    const driver = await this.driversRepository.assignVehicle(assignationDto);
    this.eventEmitter.emit(
      'vehicle.assigned',
      new VehicleAssignedEvent(assignationDto.vehicleId),
    );
    return driver;
  }

  async releaseVehicle(assignationDto: AssignDriversVehicleDto) {
    const { driverId, vehicleId } = assignationDto;
    const driver = await this.driversRepository.releaseVehicle(driverId);
    this.eventEmitter.emit(
      'vehicle.released',
      new VehicleAssignedEvent(vehicleId),
    );
    return driver;
  }
}
