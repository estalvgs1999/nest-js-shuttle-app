import { Controller, Param, Patch } from '@nestjs/common';
import { RidePickUpService } from '../services';

@Controller({ path: 'rides' })
export class RidePickUpController {
  constructor(private readonly service: RidePickUpService) {}

  @Patch('/:id/pick-up')
  pickingUp(@Param('id') rideId: string) {
    return this.service.run(rideId);
  }
}
