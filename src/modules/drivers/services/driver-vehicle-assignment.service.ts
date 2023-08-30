import { Driver } from '../entities';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  VEHICLES_REPOSITORY,
  VehiclesRepository,
} from '../../vehicles/repositories';
import { VehicleStatus } from 'src/modules/vehicles/enums';

@Injectable()
export class DriverVehicleAssignmentService {
  private readonly logger = new Logger(DriverVehicleAssignmentService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async getVehicleAssignedToDriver(
    driverId: string,
  ): Promise<string | undefined> {
    this.logger.log(`Looking for driver with ID: ${driverId}`);
    const driver: Driver = await this.driversRepository.findById(driverId);

    if (!driver) throw new NotFoundException(`Driver not found`);

    const hasVehicleAssigned = driver['vehicle'];

    if (!hasVehicleAssigned) {
      this.logger.log(`Driver has no assigned vehicle`);
      return undefined;
    }

    const vehicleId: string = driver.vehicle['_id'];

    this.logger.log(`Driver has vehicle ${vehicleId} assigned`);

    return vehicleId;
  }

  async assignVehicle(driverId: string, vehicleId: string): Promise<Driver> {
    this.logger.log(`Assigning vehicle ${vehicleId} to driver ${driverId}`);

    const updatedDriver: Driver = await this.driversRepository.assignVehicle(
      driverId,
      vehicleId,
    );

    if (!updatedDriver)
      throw new InternalServerErrorException(
        `Driver vehicle assignation failed`,
      );

    this.logger.log(
      `Driver vehicle assignation succeed: driver ${driverId} has been updated. Driver now has status ${updatedDriver.status}`,
    );

    return updatedDriver;
  }

  async releaseVehicle(driverId: string, vehicleId: string): Promise<Driver> {
    this.logger.log(`Releasing vehicle ${vehicleId} from driver ${driverId}`);

    const updatedDriver: Driver = await this.driversRepository.releaseVehicle(
      driverId,
    );

    if (!updatedDriver)
      throw new InternalServerErrorException(
        `Driver's vehicle releasing failed`,
      );

    this.logger.log(
      `Driver-vehicle release successful: Driver ${driverId} has been updated. The driver now has the status ${updatedDriver.status}.`,
    );

    return updatedDriver;
  }

  async hardVehicleRelease(driver: Driver) {
    const driverId = driver['_id'];
    const vehicleId = driver.vehicle['_id'];

    try {
      await this.releaseVehicle(driverId, vehicleId);
      await this.vehiclesRepository.releaseVehicle(
        vehicleId,
        VehicleStatus.Available,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Driver and vehicle release failed: ${error}`,
      );
    }
  }
}
