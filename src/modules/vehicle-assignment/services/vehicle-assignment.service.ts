import { DriverVehicleAssignmentService } from '../../drivers/services';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { VehicleAssignmentDto, VehicleReleaseDto } from '../dto';
import { VehicleDriverAssignmentService } from '../../vehicles/services';

@Injectable()
export class VehicleAssignmentService {
  private readonly logger = new Logger(VehicleAssignmentService.name);

  constructor(
    private readonly driverService: DriverVehicleAssignmentService,
    private readonly vehicleService: VehicleDriverAssignmentService,
  ) {}

  async assignVehicle(assignationDto: VehicleAssignmentDto) {
    const { driverId, vehicleId } = assignationDto;

    this.logger.log('Vehicle assignment process started');

    const driverVehicle = await this.driverService.getVehicleAssignedToDriver(
      driverId,
    );

    const vehicleAvailable = await this.vehicleService.isAvailable(vehicleId);

    if (!vehicleAvailable)
      throw new InternalServerErrorException(
        'Assignment failed: vehicle is not available',
      );

    if (driverVehicle) {
      this.logger.log(
        'Driver has a vehicle assigned, proceeding to replacement',
      );
      await this.releaseVehicle({ driverId, vehicleId: driverVehicle });
    }

    try {
      await this.vehicleService.assignDriver(driverId, vehicleId);
      await this.driverService.assignVehicle(driverId, vehicleId);
    } catch (error) {
      throw new InternalServerErrorException(
        `Vehicle and driver assignment failed: ${error}`,
      );
    }

    this.logger.log('Successful assignment');

    return { message: 'Successful assignment' };
  }

  async releaseVehicle(releaseDto: VehicleReleaseDto) {
    const { driverId } = releaseDto;

    const driverVehicle = await this.driverService.getVehicleAssignedToDriver(
      driverId,
    );

    if (!driverVehicle)
      throw new InternalServerErrorException(
        'Driver does not have a vehicle to release',
      );

    try {
      await this.vehicleService.releaseDriver(driverVehicle);
      await this.driverService.releaseVehicle(driverId, driverVehicle);
    } catch (error) {
      throw new InternalServerErrorException(
        `Vehicle and driver release failed: ${error}`,
      );
    }

    this.logger.log('Successful release');

    return { message: 'Successful release' };
  }
}
