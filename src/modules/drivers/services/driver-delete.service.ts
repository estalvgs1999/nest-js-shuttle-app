import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { DriverVehicleAssignmentService } from './driver-vehicle-assignment.service';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteDriverService {
  private readonly logger = new Logger(DeleteDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
    private readonly driversService: DriverVehicleAssignmentService,
  ) {}

  async run(userId: string) {
    this.logger.log(`Deleting driver from user ${userId}`);

    const driver = await this.driversRepository.findByUserId(userId);

    if (!driver) throw new NotFoundException(`Driver not found`);

    const driverId = driver['_id'];

    if (driver.vehicle) {
      this.logger.log(
        'Driver has vehicle assigned, releasing vehicle assignation',
      );
      await this.driversService.hardVehicleRelease(driver);
    }

    const deletedDriver = await this.driversRepository.delete(driverId);

    this.logger.log(`User deleted`);

    return deletedDriver;
  }
}
