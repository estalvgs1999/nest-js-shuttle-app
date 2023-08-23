import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { DeleteDriverEvent } from '../events';
import { VehicleAssignedEvent } from 'src/modules/vehicles/events';

@Injectable()
export class DeleteDriverService {
  private readonly logger = new Logger(DeleteDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async run(payload: DeleteDriverEvent) {
    const { userId } = payload;
    this.logger.log(`Deleting driver from user ${userId}`);
    const driver = await this.driversRepository.findByUserId(userId);

    if (!driver)
      throw new NotFoundException(`Driver with user id ${userId} not found`);

    const driverId = driver['_id'];
    const vehicleId = driver.vehicle['_id'];

    await this.driversRepository.delete(driverId);

    this.logger.log(`User deleted`);

    if (driver.vehicle) {
      this.eventEmitter.emit(
        'vehicle.released',
        new VehicleAssignedEvent(vehicleId),
      );
    }

    return driver;
  }
}
