import { DeleteDriverEvent } from '../events';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { VehicleAssignmentService } from 'src/modules/vehicles/services';

@Injectable()
export class DeleteDriverService {
  private readonly logger = new Logger(DeleteDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
    private readonly vehicleAssignmentService: VehicleAssignmentService,
  ) {}

  async run(payload: DeleteDriverEvent) {
    const { userId } = payload;
    this.logger.log(`Deleting driver from user ${userId}`);
    const driver = await this.driversRepository.findByUserId(userId);

    if (!driver) throw new NotFoundException(`Driver not found`);

    const driverId = driver['_id'];

    await this.driversRepository.delete(driverId);

    this.logger.log(`User deleted`);

    if (driver.vehicle) {
      const vehicleId = driver.vehicle['_id'];
      await this.vehicleAssignmentService.release(vehicleId);
    }

    return driver;
  }
}
