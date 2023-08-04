import { CreateUserService } from './modules/users/services/create-user.service';
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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RideReservationsModule } from './modules/ride-reservations/ride-reservations.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { PointsOfInterestModule } from './modules/points-of-interest/points-of-interest.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    LoggerModule.forRoot(loggerOptions),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync(mongooseConfigAsync),
    ReservationsModule,
    RideReservationsModule,
    VehiclesModule,
    PointsOfInterestModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [CreateUserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
