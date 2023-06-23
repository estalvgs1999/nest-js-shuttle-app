import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        header: 'apiKey',
        prefix: '',
      },
      true,
      (apiKey, done) => {
        const checkKey = authService.validateApiKey(apiKey);
        return done(checkKey);
      },
    );
  }
}
