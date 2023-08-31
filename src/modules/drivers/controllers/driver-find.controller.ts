import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverFilterDto } from '../dtos';
import { FindDriverService } from '../services';

@Controller({ path: 'driver' })
export class FindDriverController {
  constructor(private readonly service: FindDriverService) {}

  @Get('/:id')
  findById(@Param('id') driverId: string) {
    return this.service.findById(driverId);
  }

  @Get()
  findAll(@Query() filterDto: DriverFilterDto) {
    return this.service.findByFilter(filterDto);
  }
}
