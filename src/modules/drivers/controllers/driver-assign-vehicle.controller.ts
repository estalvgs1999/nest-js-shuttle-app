import { Controller, Patch, Query } from '@nestjs/common';
import { DriversVehicleService } from '../services';
import { AssignDriversVehicleDTO } from '../dtos';

@Controller({ path: 'driver' })
export class AssignDriverVehicleController {
  constructor(private readonly service: DriversVehicleService) {}

  @Patch('/assign')
  assignVehicle(@Query() assignationDTO: AssignDriversVehicleDTO) {
    return this.service.assignVehicle(assignationDTO);
  }

  @Patch('/release')
  releaseVehicle(@Query() assignationDTO: AssignDriversVehicleDTO) {
    return this.service.releaseVehicle(assignationDTO);
  }
}
