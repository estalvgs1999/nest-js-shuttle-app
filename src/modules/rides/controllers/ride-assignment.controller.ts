import { Controller, Post, Query } from '@nestjs/common';
import { RideAssignmentDto } from '../dtos';
import { RideAssignmentService } from '../services';

@Controller({ path: 'rides' })
export class RideAssignmentController {
  constructor(private readonly service: RideAssignmentService) {}

  @Post('/assign')
  assignVehicle(@Query() assignationDto: RideAssignmentDto) {
    return this.service.run(assignationDto);
  }
}
