import { ApiKeyStrategy, FacebookStrategy, GoogleStrategy } from './strategies';
import { AuthMiddleware } from './middleware';
import { AuthService } from './services';
import { ConfigModule } from '@nestjs/config';
import {
  FacebookAuthController,
  GoogleAuthController,
  LocalAuthController,
} from './controllers';
import { JwtModule } from '@nestjs/jwt';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({}), UsersModule],
  providers: [AuthService, ApiKeyStrategy, FacebookStrategy, GoogleStrategy],
  controllers: [
    FacebookAuthController,
    GoogleAuthController,
    LocalAuthController,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'health', method: RequestMethod.GET }, 'auth/(.*)')
      .forRoutes('*');
  }
}
