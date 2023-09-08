import { BOOKING_REPOSITORY, BookingRepository } from '../repositories';
import { BookingTransformService } from './booking-transform.service';
import { FindBookingsService } from './booking-find.service';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdateBookingClientEvent } from '../events';
import { User } from '@/modules/users/entities';

@Injectable()
export class UpdateBookingClientInfoService {
  private readonly logger = new Logger(UpdateBookingClientInfoService.name);

  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    private readonly findBookingService: FindBookingsService,
    private readonly transformBookingService: BookingTransformService,
  ) {}

  @OnEvent('booking.update-client')
  private async updateOnClientUpdate(payload: UpdateBookingClientEvent) {
    const { identifier: userId } = payload;
    const user = await this.transformBookingService.getUserById(userId);

    if (!user) throw new NotFoundException('User not found');
    await this.updateBookingsClientInfo(user);
  }

  private async updateBookingsClientInfo(user: User) {
    const bookings = await this.findBookingService.search({
      email: user['email'],
    });

    for (const booking of bookings) {
      booking.clientInfo.client = user['_id'];
      booking.clientInfo.languages = user['languages'];
      booking.clientInfo.name = `${user['name']} ${user['lastName']}`;
      booking.clientInfo.profilePicture = user['profilePicture'];
      await this.bookingRepository.update(booking['_id'], booking);
    }
  }
}
