import { EventEmitter2 } from '@nestjs/event-emitter';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateBookingClientEvent } from '@/modules/booking/events';
import { UpdateUserDto } from '../dtos';
import { User } from '../schemas';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';

@Injectable()
export class UpdateUserService {
  private readonly logger = new Logger(UpdateUserService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async run(userId: string, updateUserDto: UpdateUserDto) {
    this.logger.log('Updating user data.');
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    const updatedUser = await this.usersRepository.update(
      userId,
      updateUserDto,
    );

    this.updateBookings(updatedUser);
    return updatedUser;
  }

  public updateBookings(user: User) {
    this.logger.log('Emitting bookings update client info event');
    this.eventEmitter.emit(
      'booking.update-client',
      new UpdateBookingClientEvent(user['_id']),
    );
  }
}
