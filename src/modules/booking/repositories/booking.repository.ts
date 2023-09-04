import { Booking } from '../schemas';
import { CreateBookingDto } from '../dtos';

export interface BookingRepository {
  create(createBookingDto: CreateBookingDto): Promise<Booking>;
  findById(bookingId: string): Promise<Booking>;
  findByBookingNumber(bookingNumber: string): Promise<Booking>;
  findAll(): Promise<Booking[]>;
  update(bookingId: string, updatedBooking: Booking): Promise<Booking>;
}

export const BOOKING_REPOSITORY = 'BookingRepository';
