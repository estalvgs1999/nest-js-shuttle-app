import { Booking } from '../entities';
import { BOOKING_REPOSITORY, BookingRepository } from '../repositories';
import { BookingFilterDto } from '../dtos';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindBookingsService {
  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
  ) {}

  async findById(bookingId: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findByBookingNumber(bookingNumber: string): Promise<Booking> {
    const booking = await this.bookingRepository.findByBookingNumber(
      bookingNumber,
    );
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async search(filter: BookingFilterDto): Promise<Booking[]> {
    const bookings = await this.bookingRepository.findAll();
    return bookings;
  }
}
