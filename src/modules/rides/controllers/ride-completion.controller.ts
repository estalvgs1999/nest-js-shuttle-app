import { Controller, Param, Patch } from '@nestjs/common';
import { RideCompletionService } from '../services';

@Controller({ path: 'rides' })
export class RideCompletionController {
  constructor(private readonly service: RideCompletionService) {}

  @Patch('/:id/complete')
  completeRide(@Param('id') rideId: string) {
    return this.service.run(rideId);
  }
}
