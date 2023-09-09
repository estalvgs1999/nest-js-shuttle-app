import { Controller, Get, Param } from '@nestjs/common';
import { RideDriverSuggestionsService } from '../services';

@Controller({ path: 'rides' })
export class RideDriverSuggestionsController {
  constructor(private readonly service: RideDriverSuggestionsService) {}

  @Get('booking/:id/driver-suggestions')
  findUserRides(@Param('id') bookingId: string) {
    return this.service.run(bookingId);
  }
}
