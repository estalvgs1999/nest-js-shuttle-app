import * as bcrypt from 'bcrypt';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '../entities';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';

@Injectable()
export class ValidateUserService {
  private readonly logger = new Logger(ValidateUserService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) return null;

    const isValidPassword = await this.checkPassword(password, user.password);

    return isValidPassword ? user : null;
  }

  private async checkPassword(
    password: string,
    passwordDB: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }
}
