import { Controller, Patch, Query } from '@nestjs/common';
import { AssignDriversVehicleService } from '../services';
import { AssignDriversVehicleDto } from '../dtos';

@Controller({ path: 'driver' })
export class AssignDriverVehicleController {
  constructor(private readonly service: AssignDriversVehicleService) {}

  @Patch('/assign')
  assignVehicle(@Query() assignationDto: AssignDriversVehicleDto) {
    return this.service.assignVehicle(assignationDto);
  }

  @Patch('/release')
  releaseVehicle(@Query() assignationDto: AssignDriversVehicleDto) {
    return this.service.releaseVehicle(assignationDto);
  }
}
