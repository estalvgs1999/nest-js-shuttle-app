import { Controller, Get } from '@nestjs/common';
import { FindDriverService } from '../services';

@Controller({ path: 'driver' })
export class FindDriverController {
  constructor(private readonly service: FindDriverService) {}

  @Get()
  findAll() {
    return this.service.run();
  }
}
