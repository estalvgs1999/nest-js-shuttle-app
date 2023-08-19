import { Controller, Get, Query } from '@nestjs/common';
import { FindDriverService } from '../services';
import { DriverFilterDTO } from '../dtos';

@Controller({ path: 'driver' })
export class FindDriverController {
  constructor(private readonly service: FindDriverService) {}

  @Get()
  findAll(@Query() filterDTO: DriverFilterDTO) {
    return this.service.run(filterDTO);
  }
}
