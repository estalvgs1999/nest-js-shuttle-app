import { Injectable, Inject, Logger } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';
import { UserFilterDTO } from '../dtos/user-filter.dto';
import { User } from '../entities';

@Injectable()
export class FindUsersService {
  private readonly logger = new Logger(FindUsersService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async run(filter: UserFilterDTO): Promise<User[]> {
    return this.usersRepository.findByFilter(filter);
  }
}
