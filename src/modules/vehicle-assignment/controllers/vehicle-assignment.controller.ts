import { Controller, Patch, Query } from '@nestjs/common';
import { VehicleAssignmentService } from '../services';
import { VehicleAssignmentDto, VehicleReleaseDto } from '../dto';

@Controller({ path: 'vehicle-assignment' })
export class VehicleAssignmentController {
  constructor(private readonly service: VehicleAssignmentService) {}

  @Patch('/assign')
  assignVehicle(@Query() assignationDto: VehicleAssignmentDto) {
    return this.service.assignVehicle(assignationDto);
  }

  @Patch('/release')
  releaseVehicle(@Query() releaseDto: VehicleReleaseDto) {
    return this.service.releaseVehicle(releaseDto);
  }
}
