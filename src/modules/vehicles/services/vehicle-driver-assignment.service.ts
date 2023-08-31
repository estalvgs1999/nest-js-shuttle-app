import {
  DRIVERS_REPOSITORY,
  DriversRepository,
} from '../../drivers/repositories';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Vehicle } from '../entities';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';
import { VehicleStatus } from '../enums';

@Injectable()
export class VehicleDriverAssignmentService {
  private readonly logger = new Logger(VehicleDriverAssignmentService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  async isAvailable(vehicleId: string): Promise<boolean> {
    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle.status === VehicleStatus.Available;
  }

  async assignDriver(driverId: string, vehicleId: string) {
    this.logger.log('Finding vehicle for assignment');

    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) {
      this.logger.log('Vehicle assignment aborted: Vehicle not found');
      throw new NotFoundException('Vehicle not found');
    }

    this.logger.log(vehicle.status);

    if (
      vehicle.status === VehicleStatus.Assigned ||
      vehicle.status === VehicleStatus.OutOfService
    ) {
      this.logger.log(
        `Vehicle assignment aborted: Vehicle status is ${VehicleStatus}`,
      );
      throw new InternalServerErrorException(
        'Vehicle assignment failed. Vehicle assigned or out of service.',
      );
    }

    const updatedVehicle = await this.vehiclesRepository.update(vehicleId, {
      ...vehicle,
      driver: driverId,
      status: VehicleStatus.Assigned,
    });

    this.logger.log(
      `Assignment of vehicle ${vehicleId} to driver ${driverId} completed`,
    );

    return updatedVehicle;
  }

  async releaseDriver(vehicleId: string) {
    this.logger.log('Finding vehicle for release');

    const vehicle = await this.vehiclesRepository.findById(vehicleId);

    if (!vehicle) {
      this.logger.log('Vehicle release aborted: Vehicle not found');
      throw new NotFoundException('Vehicle not found');
    }

    const vehicleStatus =
      vehicle.status === VehicleStatus.OutOfService
        ? VehicleStatus.OutOfService
        : VehicleStatus.Available;

    const updatedVehicle = await this.vehiclesRepository.releaseVehicle(
      vehicleId,
      vehicleStatus,
    );

    this.logger.log(
      `Vehicle ${vehicleId} successfully unassigned from driver with status ${vehicleStatus}`,
    );

    return updatedVehicle;
  }

  /**
   * The function `hardDriverRelease` releases a driver from a vehicle and updates the database
   * accordingly, throwing an error if the release fails.
   * @param {Vehicle} vehicle - The `vehicle` parameter is an object that represents a vehicle. It
   * likely contains properties such as `driver`, which represents the driver assigned to the vehicle,
   * and `_id`, which represents the unique identifier of the vehicle.
   */
  async hardDriverRelease(vehicle: Vehicle) {
    const driverId = vehicle.driver['_id'];
    const vehicleId = vehicle['_id'];

    try {
      await this.releaseDriver(vehicleId);
      await this.driversRepository.releaseVehicle(driverId);
    } catch (error) {
      throw new InternalServerErrorException(
        `Vehicle and driver release failed: ${error}`,
      );
    }
  }
}
