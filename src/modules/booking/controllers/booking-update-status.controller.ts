import { Controller, Param, Patch, Query } from '@nestjs/common';
import { UpdateBookingStatusDto } from '../dtos';
import { UpdateBookingStatusService } from '../services';

@Controller({ path: 'reservation' })
export class UpdateBookingStatusController {
  constructor(private readonly service: UpdateBookingStatusService) {}

  @Patch('/:id/update')
  update(
    @Param('id') bookingId: string,
    @Query() updateStatusDto: UpdateBookingStatusDto,
  ) {
    return this.service.run(bookingId, updateStatusDto.status);
  }
}
