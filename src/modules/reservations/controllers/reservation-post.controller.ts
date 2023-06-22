import { Body, Controller, Post } from '@nestjs/common';
import { RawReservationDTO } from '../dtos/reservation-raw.dto';
import { CreateReservationService } from '../services';

@Controller('api/v1/reservation')
export class ReservationPostController {
  constructor(private readonly service: CreateReservationService) {}

  @Post()
  create(@Body() rawReservationDTO: RawReservationDTO) {
    return this.service.createReservation(rawReservationDTO);
  }
}
