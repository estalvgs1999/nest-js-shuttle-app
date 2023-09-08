import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverFilterDto } from '../dtos';
import { FindDriverService } from '../services';
import { GetCurrentUserId } from '@/common/decorators';

@Controller({ path: 'driver' })
export class FindDriverController {
  constructor(private readonly service: FindDriverService) {}

  @Get('/:id')
  findById(@Param('id') driverId: string) {
    return this.service.findById(driverId);
  }

  @Get('/profile/me')
  findMyProfile(@GetCurrentUserId() userId: string) {
    return this.service.findByUser(userId);
  }

  @Get()
  findAll(@Query() filterDto: DriverFilterDto) {
    return this.service.findByFilter(filterDto);
  }
}
