import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteVehicleService } from '../services';

@Controller({ path: 'vehicle' })
export class DeleteVehicleController {
  constructor(private readonly service: DeleteVehicleService) {}

  @Delete('/:id/delete')
  delete(@Param('id') vehicleId: string) {
    return this.service.run(vehicleId);
  }
}
