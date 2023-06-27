import { Body, Controller, Post } from '@nestjs/common';
import { RawReservationDTO } from '../dtos/reservation-raw.dto';
import { CreateReservationService } from '../services';

@Controller({ path: 'reservation' })
export class CreateReservationController {
  constructor(private readonly service: CreateReservationService) {}

  @Post('/create')
  create(@Body() rawReservationDTO: RawReservationDTO) {
    return this.service.run(rawReservationDTO);
  }
}
