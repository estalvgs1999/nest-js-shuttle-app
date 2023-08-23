import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../../users/dtos';
import { CreateUserService, ValidateUserService } from '../../users/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces';
import { Tokens } from '../types';
import { AuthDto } from '../dtos';

@Injectable()
export class AuthService {
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly createUserService: CreateUserService,
    private readonly validationService: ValidateUserService,
  ) {
    this.apiKey = this.configService.get('apiKey');
  }

  validateApiKey(apiKey: string): boolean {
    return this.apiKey === apiKey;
  }

  private async getTokens(payload: Payload): Promise<Tokens> {
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
    return tokens;
  }

  async signInLocal(dto: AuthDto): Promise<Tokens> {
    const { email, password } = dto;
    const user = await this.validationService.validateUser(email, password);

    if (!user) throw new UnauthorizedException();

    const tokens = await this.getTokens({
      sub: user['_id'],
      email: user.email,
      role: user.role,
    });

    return tokens;
  }
}
