import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../entities';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';
import { DeleteDriverEvent } from 'src/modules/drivers/events';
import { UserRole } from '../enums';
import { DeleteDriverService } from '../../../modules/drivers/services';

@Injectable()
export class DeleteUserService {
  private readonly logger = new Logger(DeleteUserService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    @Inject(DeleteDriverService)
    private readonly deleteDriverService: DeleteDriverService,
  ) {}

  async run(userId: string): Promise<User> {
    this.logger.log(`Deleting user ${userId}`);

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    if (user.role === UserRole.Driver) await this.deleteDriver(userId);

    await this.usersRepository.delete(userId);
    this.logger.log('User deleted');

    return user;
  }

  private async deleteDriver(userId: string) {
    this.logger.log('Emitting delete driver event');
    await this.deleteDriverService.run(new DeleteDriverEvent(userId));
  }
}
