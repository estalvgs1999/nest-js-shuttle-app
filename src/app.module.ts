import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {
  configOptions,
  loggerOptions,
  mongooseConfigAsync,
} from './common/config';
import { LoggerModule } from 'nestjs-pino';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { CorrelationIdMiddleware } from './common/middleware';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    LoggerModule.forRoot(loggerOptions),
    MongooseModule.forRootAsync(mongooseConfigAsync),
    ReservationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
