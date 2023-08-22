import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';
import { UpdateUserDTO } from '../dtos';

@Injectable()
export class UpdateUserService {
  private readonly logger = new Logger(UpdateUserService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async run(userId: string, updateUserDTO: UpdateUserDTO) {
    this.logger.log('Updating user data.');
    const user = this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    return await this.usersRepository.update(userId, updateUserDTO);
  }
}
