import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy, FacebookStrategy, GoogleStrategy } from './strategies';
import { AuthMiddleware } from './middleware';
import { FacebookLoginController } from './controllers';
import { GoogleLoginController } from './controllers/google-login.controller';

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [AuthService, ApiKeyStrategy, FacebookStrategy, GoogleStrategy],
  controllers: [FacebookLoginController, GoogleLoginController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'health', method: RequestMethod.GET }, 'auth/(.*)')
      .forRoutes('*');
  }
}
