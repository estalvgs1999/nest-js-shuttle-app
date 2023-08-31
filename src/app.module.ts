import { AccessTokenGuard, RolesGuard } from './modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import {
  AuthModule,
  DriversModule,
  GalleryModule,
  PointsOfInterestModule,
  ReservationsModule,
  RideTicketsModule,
  RideStatsModule,
  UsersModule,
  VehicleAssignmentModule,
  VehiclesModule,
} from './modules';
import { ConfigModule } from '@nestjs/config';
import {
  configOptions,
  loggerOptions,
  mongooseConfigAsync,
} from './common/config';
import { CorrelationIdMiddleware } from './common/middleware';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from 'nestjs-pino';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    LoggerModule.forRoot(loggerOptions),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync(mongooseConfigAsync),
    ReservationsModule,
    RideTicketsModule,
    VehiclesModule,
    VehicleAssignmentModule,
    PointsOfInterestModule,
    AuthModule,
    UsersModule,
    DriversModule,
    GalleryModule,
    RideStatsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
