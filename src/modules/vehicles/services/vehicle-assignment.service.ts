import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';
import { VehicleStatus } from '../enums';

@Injectable()
export class VehicleAssignmentService {
  private readonly logger = new Logger(VehicleAssignmentService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async assign(driverId: string, vehicleId: string) {
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

    const result = await this.vehiclesRepository.update(vehicleId, {
      ...vehicle,
      driver: driverId,
      status: VehicleStatus.Assigned,
    });

    this.logger.log(
      `Assignment of vehicle ${vehicleId} to driver ${driverId} completed`,
    );

    return result;
  }

  async release(vehicleId: string) {
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

    const result = await this.vehiclesRepository.update(vehicleId, {
      ...vehicle,
      status: vehicleStatus,
      driver: undefined,
    });

    this.logger.log(
      `Vehicle ${vehicleId} successfully unassigned from driver with status ${vehicleStatus}`,
    );

    return result;
  }
}
