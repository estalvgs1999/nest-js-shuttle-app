import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dtos';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';

@Injectable()
export class UpdateUserService {
  private readonly logger = new Logger(UpdateUserService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async run(userId: string, updateUserDto: UpdateUserDto) {
    this.logger.log('Updating user data.');
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    return await this.usersRepository.update(userId, updateUserDto);
  }
}
