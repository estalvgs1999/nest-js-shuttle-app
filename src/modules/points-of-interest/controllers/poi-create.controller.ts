import { Body, Controller, Post } from '@nestjs/common';
import { CreatePOIDto } from '../dtos';
import { CreatePOIService } from '../services';
import { Roles } from '@Common/decorators';

@Controller({ path: 'points-of-interest' })
export class CreatePOIController {
  constructor(private readonly service: CreatePOIService) {}

  @Post('/create')
  @Roles('Super')
  create(@Body() createPOIDto: CreatePOIDto) {
    return this.service.run(createPOIDto);
  }
}
