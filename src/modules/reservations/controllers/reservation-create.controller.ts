import { Body, Controller, Post } from '@nestjs/common';
import { CreateReservationService } from '../services';
import { RawReservationDto } from '../dtos/reservation-raw.dto';

@Controller({ path: 'reservation' })
export class CreateReservationController {
  constructor(private readonly service: CreateReservationService) {}

  @Post('/create')
  create(@Body() rawReservationDto: RawReservationDto) {
    return this.service.run(rawReservationDto);
  }
}
