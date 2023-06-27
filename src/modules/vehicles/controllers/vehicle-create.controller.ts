import { Body, Controller, Post } from '@nestjs/common';
import { CreateVehicleService } from '../services';
import { CreateVehicleDTO } from '../dtos';

@Controller('api/v1/vehicle')
export class CreateVehicleController {
  constructor(private readonly service: CreateVehicleService) {}

  @Post()
  create(@Body() createVehicleDTO: CreateVehicleDTO) {
    return this.service.run(createVehicleDTO);
  }
}
