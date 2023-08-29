import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateVehicleService } from '../services';
import { UpdateVehicleDto } from '../dtos';

@Controller({ path: 'vehicle' })
export class UpdateVehicleStatusController {
  constructor(private readonly service: UpdateVehicleService) {}

  @Patch('/:id/update')
  create(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.service.run(id, dto);
  }
}
