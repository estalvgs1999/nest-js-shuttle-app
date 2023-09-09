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
    this.logger.log('Update booking client info event triggered');

    const user = await this.transformBookingService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.updateBookingsClientInfo(user);
  }

  /**
   * The function updates the client information for all bookings associated with a user.
   * @param {User} user - The `user` parameter is an object that represents a user.
   */
  private async updateBookingsClientInfo(user: User) {
    this.logger.log('Searching all user bookings');
    const bookings = await this.findBookingService.findByEmail(user['email']);

    const totalBookings = bookings.length;
    let processedBookings = 0;
    this.logger.log(`User has ${totalBookings} bookings`);

    // Iterates over each booking in the `bookings` array and updates the client
    for (const booking of bookings) {
      booking.clientInfo.client = user['_id'];
      booking.clientInfo.languages = user['languages'];
      booking.clientInfo.name = `${user['name']} ${user['lastName']}`;
      booking.clientInfo.profilePicture = user['profilePicture'];
      await this.bookingRepository.update(booking['_id'], booking);
      this.logger.log(
        `${++processedBookings} of ${totalBookings} bookings updated!`,
      );
    }

    this.logger.log('Bookings client info updated successfully');
  }
}
