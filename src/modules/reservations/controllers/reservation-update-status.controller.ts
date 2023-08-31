import { Controller, Param, Patch, Query } from '@nestjs/common';
import { UpdateReservationStatusService } from '../services';
import { ReservationUpdateStatusDto } from '../dtos';

@Controller({ path: 'reservation' })
export class UpdateReservationStatusController {
  constructor(private readonly service: UpdateReservationStatusService) {}

  @Patch('/:id/update')
  update(
    @Param('id') id: string,
    @Query() updateStatusDto: ReservationUpdateStatusDto,
  ) {
    return this.service.run(id, updateStatusDto.status);
  }
}
