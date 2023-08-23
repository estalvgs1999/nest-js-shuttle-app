import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';

@Injectable()
export class UserRefreshTokenService {
  private readonly logger = new Logger(UserRefreshTokenService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async updateRefreshTokenHash(email: string, refreshToken: string) {
    this.logger.log('Updating user refresh token.');
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found.`);
    }

    const hash = await this.hashData(refreshToken);
    return await this.usersRepository.updateRefreshToken(email, hash);
  }

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
