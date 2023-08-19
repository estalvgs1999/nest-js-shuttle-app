import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindVehicleService } from '../services';
import { VehicleFilterDTO } from '../dtos/vehicle-filter.dto';

@Controller({ path: 'vehicle' })
export class FindVehicleController {
  constructor(private readonly service: FindVehicleService) {}

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get()
  findByFilter(@Query() filter: VehicleFilterDTO) {
    return this.service.findByFilter(filter);
  }
}
