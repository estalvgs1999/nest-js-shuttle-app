import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateVehicleService } from '../services';
import { UpdateVehicleDTO } from '../dtos';

@Controller({ path: 'vehicle' })
export class UpdateVehicleStatusController {
  constructor(private readonly service: UpdateVehicleService) {}

  @Patch('/:id/update')
  create(@Param('id') id: string, @Body() dto: UpdateVehicleDTO) {
    return this.service.run(id, dto);
  }
}
