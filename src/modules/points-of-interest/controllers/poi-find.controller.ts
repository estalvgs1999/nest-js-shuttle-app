import { Controller, Get, Param } from '@nestjs/common';
import { FindPOIService } from '../services';

@Controller({ path: 'points-of-interest' })
export class FindPOIController {
  constructor(private readonly service: FindPOIService) {}

  @Get('')
  findAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
