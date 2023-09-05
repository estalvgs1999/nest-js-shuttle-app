import { BOOKING_REPOSITORY, BookingRepository } from '../repositories';
import { BookingStatus } from '../enums';
import { FindBookingsService } from './booking-find.service';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdateBookingStatusEvent } from '../events';

@Injectable()
export class UpdateBookingStatusService {
  private readonly logger = new Logger(UpdateBookingStatusService.name);

  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    private readonly bookingService: FindBookingsService,
  ) {}

  public async run(bookingId: string, bookingStatus: BookingStatus) {
    this.logger.log(`Updating booking ${bookingId} status to ${bookingStatus}`);
    const booking = await this.bookingService.findById(bookingId);
    booking.status = bookingStatus;
    await this.bookingRepository.update(bookingId, booking);

    return {
      message: 'Booking updated successfully',
      status: HttpStatus.OK,
    };
  }

  @OnEvent('booking.update-status')
  private async updateStatus(payload: UpdateBookingStatusEvent) {
    const { bookingId, bookingStatus } = payload;
    return await this.run(bookingId, bookingStatus);
  }
}
