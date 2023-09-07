import { Booking, BookingModel } from '../schemas';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookingMongoRepository implements BookingRepository {
  constructor(
    @InjectModel(Booking.name)
    private readonly model: BookingModel,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const newBooking = await new this.model(createBookingDto).save();
    return newBooking;
  }

  async findById(bookingId: string): Promise<Booking> {
    const reservation = await this.model.findById(bookingId);
    return reservation;
  }

  async findByBookingNumber(bookingNumber: string): Promise<Booking[]> {
    const booking = await this.model.find({
      bookingNumber: bookingNumber,
    });
    return booking;
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await this.model.find();
    return bookings;
  }

  async update(bookingId: string, booking: Booking): Promise<Booking> {
    const updatedBooking = await this.model.findByIdAndUpdate(
      bookingId,
      booking,
      { new: true },
    );
    return updatedBooking;
  }
}
