import { Controller, Param, Patch, Query } from '@nestjs/common';
import { UpdateReservationStatusService } from '../services';
import { ReservationUpdateStatusDTO } from '../dtos';

@Controller({ path: 'reservation' })
export class UpdateReservationStatusController {
  constructor(private readonly service: UpdateReservationStatusService) {}

  @Patch('/:id/update')
  update(
    @Param('id') id: string,
    @Query() updateStatusDTO: ReservationUpdateStatusDTO,
  ) {
    return this.service.run(id, updateStatusDTO.status);
  }
}
