import { Controller, Param, Patch, Query } from '@nestjs/common';
import { UpdateVehicleStatusService } from '../services';
import { UpdateVehicleStatusDto } from '../dtos';

@Controller({ path: 'vehicle' })
export class UpdateVehicleStatusController {
  constructor(private readonly service: UpdateVehicleStatusService) {}

  @Patch('/:plate/update')
  create(
    @Param('plate') plate: string,
    @Query() updateVehicleStatusDto: UpdateVehicleStatusDto,
  ) {
    const { status } = updateVehicleStatusDto;
    return this.service.run(plate, status);
  }
}
