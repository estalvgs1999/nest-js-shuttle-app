import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';

@Injectable()
export class UpdateUserPictureService {
  private readonly logger = new Logger(UpdateUserPictureService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async run(userId: string, pictureUrl: string) {
    this.logger.log('Updating user profile picture.');
    const user = this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    return await this.usersRepository.updateProfilePicture(userId, pictureUrl);
  }
}
