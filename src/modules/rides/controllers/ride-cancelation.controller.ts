import { Controller, Param, Post } from '@nestjs/common';
import { RideCancelationService } from '../services';

@Controller({ path: 'rides' })
export class RideCancelationController {
  constructor(private readonly service: RideCancelationService) {}

  @Post('/:id/cancel')
  assignVehicle(@Param('id') bookingId: string) {
    return this.service.run(bookingId);
  }
}
