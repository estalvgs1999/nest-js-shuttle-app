import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { AssignDriversVehicleDTO } from '../dtos';
import { VehicleAssignmentService } from '../../vehicles/services';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AssignDriversVehicleService {
  private readonly logger = new Logger(AssignDriversVehicleService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
    private readonly vehicleAssignmentService: VehicleAssignmentService,
  ) {}

  async assignVehicle(assignationDTO: AssignDriversVehicleDTO) {
    const { driverId, vehicleId } = assignationDTO;
    const driver = await this.driversRepository.findById(driverId);

    if (!driver) {
      this.logger.log('Driver vehicle assignation failed: Driver not found');
      throw new NotFoundException('Driver not found');
    }

    if (driver.vehicle) {
      this.logger.log('Driver has assigned vehicle, initiating replacement');
      await this.releaseVehicle({
        driverId: driverId,
        vehicleId: driver.vehicle['_id'],
      });
    }

    const result = await this.driversRepository.assignVehicle(assignationDTO);
    await this.vehicleAssignmentService.assign(driverId, vehicleId);

    this.logger.log('The driver has been assigned the vehicle correctly');

    return result;
  }

  @OnEvent('driver.released')
  async releaseVehicle(assignationDTO: AssignDriversVehicleDTO) {
    const { driverId, vehicleId } = assignationDTO;
    const driver = await this.driversRepository.releaseVehicle(driverId);

    await this.vehicleAssignmentService.release(vehicleId);

    return driver;
  }
}
