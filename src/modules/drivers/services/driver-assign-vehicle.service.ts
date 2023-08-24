import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { AssignDriversVehicleDTO } from '../dtos';
import { VehicleAssignmentService } from '../../vehicles/services';

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
    const driver = await this.driversRepository.assignVehicle(assignationDTO);

    await this.vehicleAssignmentService.assign(driverId, vehicleId);

    return driver;
  }

  async releaseVehicle(assignationDTO: AssignDriversVehicleDTO) {
    const { driverId, vehicleId } = assignationDTO;
    const driver = await this.driversRepository.releaseVehicle(driverId);

    await this.vehicleAssignmentService.release(vehicleId);

    return driver;
  }
}
