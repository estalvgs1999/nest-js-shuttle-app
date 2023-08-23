import { Body, Controller, Post } from '@nestjs/common';
import { RawReservationDto } from '../dtos/reservation-raw.dto';
import { CreateReservationService } from '../services';

@Controller({ path: 'reservation' })
export class CreateReservationController {
  constructor(private readonly service: CreateReservationService) {}

  @Post('/create')
  create(@Body() rawReservationDto: RawReservationDto) {
    return this.service.run(rawReservationDto);
  }
}
