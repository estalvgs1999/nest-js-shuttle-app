import { Body, Controller, Post } from '@nestjs/common';
import { CreateVehicleDto } from '../dtos';
import { CreateVehicleService } from '../services';

@Controller({ path: 'vehicle' })
export class CreateVehicleController {
  constructor(private readonly service: CreateVehicleService) {}

  @Post('/create')
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.service.run(createVehicleDto);
  }
}
