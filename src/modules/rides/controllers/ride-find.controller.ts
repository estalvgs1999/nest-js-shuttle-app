import { Controller, Get, Param } from '@nestjs/common';
import { FindRidesService } from '../services';

@Controller({ path: 'rides' })
export class FindRidesController {
  constructor(private readonly service: FindRidesService) {}

  @Get('/:id/user')
  findUserRides(@Param('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get('/:id/driver')
  findDriverRides(@Param('id') driverId: string) {
    return this.service.findByDriver(driverId);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
