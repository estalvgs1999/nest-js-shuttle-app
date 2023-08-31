import { Body, Controller, Post } from '@nestjs/common';
import { CreateReservationService } from '../services';
import { RawReservationDto } from '../dtos/reservation-raw.dto';
import { Public } from '@Common/decorators';

@Controller({ path: 'reservation' })
export class CreateReservationController {
  constructor(private readonly service: CreateReservationService) {}

  @Public()
  @Post('/create')
  create(@Body() rawReservationDto: RawReservationDto) {
    return this.service.run(rawReservationDto);
  }
}
