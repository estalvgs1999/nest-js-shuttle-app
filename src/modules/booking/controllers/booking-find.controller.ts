import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindBookingsService } from '../services';
import { BookingFilterDto } from '../dtos';

@Controller({ path: 'reservation' })
export class FindBookingController {
  constructor(private readonly bookingService: FindBookingsService) {}

  @Get('/:id')
  findById(@Param('id') bookingId: string) {
    return this.bookingService.findById(bookingId);
  }

  @Get('booking-number/:bookingNumber')
  findByBookingNumber(@Param('bookingNumber') bookingNumber: string) {
    return this.bookingService.findByBookingNumber(bookingNumber);
  }

  @Get()
  searchBooking(@Query() filter: BookingFilterDto) {
    return this.bookingService.search(filter);
  }
}
