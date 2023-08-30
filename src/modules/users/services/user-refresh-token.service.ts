import * as bcrypt from 'bcrypt';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';

@Injectable()
export class UserRefreshTokenService {
  private readonly logger = new Logger(UserRefreshTokenService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async updateTokenHash(email: string, refreshToken: string) {
    this.logger.log('Updating user refresh token.');
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found.`);
    }

    const userId = user['_id'];
    const hashedToken = await this.hashData(refreshToken);
    return await this.usersRepository.updateRefreshToken(userId, hashedToken);
  }

  async refreshToken(userId: string, refreshToken: string) {
    this.logger.log('Refreshing token');
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new NotFoundException(`User ${userId} not found.`);

    if (!user.hashedRt) return null;

    const tokenMatches = await bcrypt.compare(refreshToken, user.hashedRt);

    if (!tokenMatches) return null;

    return user;
  }

  async cleanToken(userId: string) {
    this.logger.log('Cleaning user refresh token.');
    return await this.usersRepository.updateRefreshToken(userId, null);
  }

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
