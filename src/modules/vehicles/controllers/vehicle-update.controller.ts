import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateVehicleDto } from '../dtos';
import { UpdateVehicleService } from '../services';

@Controller({ path: 'vehicle' })
export class UpdateVehicleStatusController {
  constructor(private readonly service: UpdateVehicleService) {}

  @Patch('/:id/update')
  create(@Param('id') vehicleId: string, @Body() updateDto: UpdateVehicleDto) {
    return this.service.run(vehicleId, updateDto);
  }
}
