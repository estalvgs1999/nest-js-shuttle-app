import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookingService } from '../services';
import { Public } from '@Common/decorators';
import { RawBookingDto } from '../dtos';

@Controller({ path: 'reservation' })
export class CreateBookingController {
  constructor(private readonly service: CreateBookingService) {}

  @Public()
  @Post('/create')
  create(@Body() rawBookingDto: RawBookingDto) {
    return this.service.run(rawBookingDto);
  }
}
