import { Booking } from '../entities';
import { BOOKING_REPOSITORY, BookingRepository } from '../repositories';
import { BookingCardDto, BookingFilterDto } from '../dtos';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindBookingsService {
  private logger = new Logger(FindBookingsService.name);

  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
  ) {}

  async findById(bookingId: string): Promise<Booking> {
    this.logger.log(`Finding booking with ID: ${bookingId}`);
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findByBookingNumber(bookingNumber: string): Promise<Booking[]> {
    this.logger.log(`Finding bookings with number: ${bookingNumber}`);
    const booking = await this.bookingRepository.findByBookingNumber(
      bookingNumber,
    );
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findByEmail(email: string): Promise<Booking[]> {
    this.logger.log(`Searching for bookings`);
    const bookings = await this.bookingRepository.findAll();

    const filteredBookings = bookings.filter(
      booking => booking.clientInfo.email === email,
    );

    return filteredBookings;
  }

  async search(filter: BookingFilterDto): Promise<BookingCardDto[]> {
    this.logger.log(`Searching for bookings`);
    const bookings = await this.bookingRepository.findAll();

    const filteredBookings = bookings.filter(booking =>
      this.matchesFilter(booking, filter),
    );

    return filteredBookings.map(booking => ({
      _id: booking['_id'],
      bookingNumber: booking.bookingNumber,
      status: booking.status,
      client: booking.clientInfo.client,
      profilePicture: booking.clientInfo.profilePicture,
      name: booking.clientInfo.name,
      route: booking.ticket.route,
      type: booking.ticket.type,
      pickUpDate: booking.ticket.pickUpDate,
    }));
  }

  private matchesFilter(booking: Booking, filter: BookingFilterDto): boolean {
    if (filter.client) {
      const clientId = booking.clientInfo?.client?.toString() || null;
      if (clientId !== filter.client) {
        return false;
      }
    }

    if (filter.email && booking.clientInfo.email !== filter.email) {
      return false;
    }

    if (filter.route && booking.ticket.route !== filter.route) {
      return false;
    }

    if (filter.type && booking.ticket.type !== filter.type) {
      return false;
    }

    if (filter.mode && booking.ticket.mode !== filter.mode) {
      return false;
    }

    if (filter.status && booking.status !== filter.status) {
      return false;
    }

    if (filter.date && booking.ticket.pickUpDate !== filter.date) {
      return false;
    }

    return true;
  }
}
