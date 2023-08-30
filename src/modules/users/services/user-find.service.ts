import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '../entities';
import { UserFilterDto } from '../dtos';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';

@Injectable()
export class FindUsersService {
  private readonly logger = new Logger(FindUsersService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findById(userId: string): Promise<User> {
    this.logger.log(`Finding user with id: ${userId}`);

    const user = await this.usersRepository.findById(userId);

    if (!user) throw new NotFoundException(`User with id ${userId} not found.`);

    return user;
  }

  async findByFilter(filter: UserFilterDto): Promise<User[]> {
    this.logger.log(`Finding all users`);
    return this.usersRepository.findByFilter(filter);
  }
}
