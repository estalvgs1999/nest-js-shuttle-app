import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../../users/dtos';
import {
  CreateUserService,
  UserRefreshTokenService,
  ValidateUserService,
} from '../../users/services';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from '../types';
import { AuthDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly createUserService: CreateUserService,
    private readonly validationService: ValidateUserService,
    private readonly refreshTokenService: UserRefreshTokenService,
  ) {}

  validateApiKey(apiKey: string): boolean {
    return this.configService.get('apiKey') === apiKey;
  }

  private async getTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload },
        {
          secret: this.configService.get('JWT_AT_SECRET'),
          expiresIn: this.configService.get('JWT_AT_EXP'),
        },
      ),
      this.jwtService.signAsync(
        { ...payload },
        {
          secret: this.configService.get('JWT_RT_SECRET'),
          expiresIn: this.configService.get('JWT_RT_EXP'),
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signUpLocal(dto: CreateUserDto): Promise<Tokens> {
    const user = await this.createUserService.run(dto);

    const tokens = await this.getTokens({
      sub: user['_id'],
      email: user.email,
      role: user.role,
    });

    await this.refreshTokenService.updateTokenHash(
      user.email,
      tokens.refresh_token,
    );
    return tokens;
  }

  async signInLocal(dto: AuthDto): Promise<Tokens> {
    const { email, password } = dto;

    const user = await this.validationService.validateUser(email, password);

    if (!user) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens({
      sub: user['_id'],
      email: user.email,
      role: user.role,
    });

    await this.refreshTokenService.updateTokenHash(
      user.email,
      tokens.refresh_token,
    );

    return tokens;
  }

  async logout(userId: string) {
    await this.refreshTokenService.cleanToken(userId);
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.refreshTokenService.refreshToken(
      userId,
      refreshToken,
    );

    if (!user) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens({
      sub: user['_id'],
      email: user.email,
      role: user.role,
    });

    await this.refreshTokenService.updateTokenHash(
      user.email,
      tokens.refresh_token,
    );

    return tokens;
  }
}
