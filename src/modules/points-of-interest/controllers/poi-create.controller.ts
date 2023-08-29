import { Body, Controller, Post } from '@nestjs/common';
import { CreatePOIService } from '../services';
import { CreatePOIDto } from '../dtos';

@Controller({ path: 'points-of-interest' })
export class CreatePOIController {
  constructor(private readonly service: CreatePOIService) {}

  @Post('/create')
  create(@Body() createPOIDto: CreatePOIDto) {
    return this.service.run(createPOIDto);
  }
}
