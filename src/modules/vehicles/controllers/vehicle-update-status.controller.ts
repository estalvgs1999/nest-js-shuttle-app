import { Controller, Param, Patch, Query } from '@nestjs/common';
import { VehicleStatus } from '../enums';
import { UpdateVehicleStatusService } from '../services';
import { UpdateVehicleStatusDTO } from '../dtos';

@Controller('api/v1/vehicle')
export class UpdateVehicleStatusController {
  constructor(private readonly service: UpdateVehicleStatusService) {}

  @Patch('/:plate')
  create(
    @Param('plate') plate: string,
    @Query() updateVehicleStatusDTO: UpdateVehicleStatusDTO,
  ) {
    const { status } = updateVehicleStatusDTO;
    return this.service.run(plate, status);
  }
}
