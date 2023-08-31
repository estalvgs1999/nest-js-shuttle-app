import { Controller, Get } from '@nestjs/common';
import { FindReservationsService } from '../services';

@Controller({ path: 'reservation' })
export class FindReservationsController {
  constructor(private readonly service: FindReservationsService) {}

  @Get()
  findAll() {
    return this.service.run();
  }
}
