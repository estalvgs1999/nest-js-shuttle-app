import { Body, Controller, Post } from '@nestjs/common';
import { CreatePOIService } from '../services';
import { CreatePOIDTO } from '../dtos';

@Controller('api/v1/poi')
export class CreatePOIController {
  constructor(private readonly service: CreatePOIService) {}

  @Post()
  create(@Body() createPOIDTO: CreatePOIDTO) {
    return this.service.run(createPOIDTO);
  }
}
