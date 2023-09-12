import { Controller, Param, Patch } from '@nestjs/common';
import { RideStartService } from '../services';

@Controller({ path: 'rides' })
export class RideStartController {
  constructor(private readonly service: RideStartService) {}

  @Patch('/:id/start')
  startRide(@Param('id') rideId: string) {
    return this.service.run(rideId);
  }
}
