import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindDriverService } from '../services';
import { DriverFilterDTO } from '../dtos';

@Controller({ path: 'driver' })
export class FindDriverController {
  constructor(private readonly service: FindDriverService) {}

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get()
  findAll(@Query() filterDTO: DriverFilterDTO) {
    return this.service.findByFilter(filterDTO);
  }
}
