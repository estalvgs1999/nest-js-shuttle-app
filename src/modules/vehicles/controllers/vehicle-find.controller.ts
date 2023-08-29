import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindVehicleService } from '../services';
import { VehicleFilterDto } from '../dtos/vehicle-filter.dto';
import { Roles } from '../../../common/decorators';

@Controller({ path: 'vehicle' })
export class FindVehicleController {
  constructor(private readonly service: FindVehicleService) {}

  @Get('/:id')
  @Roles('Admin', 'Super')
  findById(@Param('id') vehicleId: string) {
    return this.service.findById(vehicleId);
  }

  @Get()
  @Roles('Admin', 'Super')
  findByFilter(@Query() filterDto: VehicleFilterDto) {
    return this.service.findByFilter(filterDto);
  }
}
