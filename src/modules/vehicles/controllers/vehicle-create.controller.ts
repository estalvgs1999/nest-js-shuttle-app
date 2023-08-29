import { Body, Controller, Post } from '@nestjs/common';
import { CreateVehicleService } from '../services';
import { CreateVehicleDto } from '../dtos';

@Controller({ path: 'vehicle' })
export class CreateVehicleController {
  constructor(private readonly service: CreateVehicleService) {}

  @Post('/create')
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.service.run(createVehicleDto);
  }
}
