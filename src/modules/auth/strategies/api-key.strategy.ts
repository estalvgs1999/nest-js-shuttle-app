import { AuthService } from '../services/auth.service';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        header: 'apiKey',
        prefix: '',
      },
      true,
      (apiKey, done) => {
        const checkKey = this.authService.validateApiKey(apiKey);
        return done(checkKey);
      },
    );
  }
}
