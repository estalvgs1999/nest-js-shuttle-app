import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';
import { UserFilterDTO } from '../dtos';
import { User } from '../entities';

@Injectable()
export class FindUsersService {
  private readonly logger = new Logger(FindUsersService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findById(userId: string): Promise<User> {
    this.logger.log(`Finding user with id: ${userId}`);

    const user = this.usersRepository.findById(userId);

    if (!user) throw new NotFoundException(`User with id ${userId} not found.`);

    return user;
  }

  async findByFilter(filter: UserFilterDTO): Promise<User[]> {
    this.logger.log(`Finding all users`);
    return this.usersRepository.findByFilter(filter);
  }
}
