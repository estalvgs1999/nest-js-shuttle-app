import { Body, Controller, Post } from '@nestjs/common';
import { CreatePOIService } from '../services';
import { CreatePOIDTO } from '../dtos';

@Controller({ path: 'points-of-interest' })
export class CreatePOIController {
  constructor(private readonly service: CreatePOIService) {}

  @Post('/create')
  create(@Body() createPOIDTO: CreatePOIDTO) {
    return this.service.run(createPOIDTO);
  }
}
