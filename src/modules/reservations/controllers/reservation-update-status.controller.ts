import { Controller, Param, Patch, Query } from '@nestjs/common';
import { UpdateReservationStatusService } from '../services';
import { ReservationUpdateStatusDTO } from '../dtos';

@Controller('api/v1/reservation')
export class UpdateReservationStatusController {
  constructor(private readonly service: UpdateReservationStatusService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Query() updateStatusDTO: ReservationUpdateStatusDTO,
  ) {
    return this.service.run(id, updateStatusDTO.status);
  }
}
