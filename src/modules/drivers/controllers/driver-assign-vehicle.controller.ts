import { Controller, Patch, Query } from '@nestjs/common';
import { AssignDriversVehicleService } from '../services';
import { AssignDriversVehicleDTO } from '../dtos';

@Controller({ path: 'driver' })
export class AssignDriverVehicleController {
  constructor(private readonly service: AssignDriversVehicleService) {}

  @Patch('/assign')
  assignVehicle(@Query() assignationDTO: AssignDriversVehicleDTO) {
    return this.service.assignVehicle(assignationDTO);
  }

  @Patch('/release')
  releaseVehicle(@Query() assignationDTO: AssignDriversVehicleDTO) {
    return this.service.releaseVehicle(assignationDTO);
  }
}
