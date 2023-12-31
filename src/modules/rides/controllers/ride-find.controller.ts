import { Controller, Get, Param } from '@nestjs/common';
import { FindRidesService } from '../services';
import { GetCurrentUserId } from '@/common/decorators';

@Controller({ path: 'rides' })
export class FindRidesController {
  constructor(private readonly service: FindRidesService) {}

  @Get('/:id/user')
  findUserRides(@Param('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get('/user/my-rides')
  findMyRides(@GetCurrentUserId() userId: string) {
    return this.service.findByUser(userId);
  }

  @Get('/:id/driver')
  findDriverRides(@Param('id') driverId: string) {
    return this.service.findByDriver(driverId);
  }

  @Get('/driver/my-rides')
  findMyRidesDriver(@GetCurrentUserId() id: string) {
    return this.service.findByDriverUser(id);
  }

  @Get('/:id')
  findById(@Param('id') rideId: string) {
    return this.service.findById(rideId);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
