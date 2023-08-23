import { AuthDto } from '../dtos';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../../../modules/users/dtos';
import { CreateUserService } from 'src/modules/users/services';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces';
import { Tokens } from '../types';

@Injectable()
export class AuthService {
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: CreateUserService,
    private readonly jwtService: JwtService,
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
    const user = await this.userService.run(dto);
    const tokens = await this.getTokens({
      sub: user['_id'],
      email: user.email,
      role: user.role,
    });
    return tokens;
  }

  signInLocal(dto: AuthDto) {
    throw new Error('Method not implemented.');
  }
}
