import { AccessTokenGuard, RolesGuard } from './modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {
  configOptions,
  loggerOptions,
  mongooseConfigAsync,
} from './common/config';
import { CorrelationIdMiddleware } from './common/middleware';
import { DriversModule } from './modules/drivers/drivers.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GalleryModule } from './modules/gallery/gallery.module';
import { LoggerModule } from 'nestjs-pino';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PointsOfInterestModule } from './modules/points-of-interest/points-of-interest.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RideReservationsModule } from './modules/ride-reservations/ride-reservations.module';
import { RideStatsModule } from './modules/ride-stats/ride-stats.module';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { VehicleAssignmentModule } from './modules/vehicle-assignment/vehicle-assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    LoggerModule.forRoot(loggerOptions),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync(mongooseConfigAsync),
    ReservationsModule,
    RideReservationsModule,
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
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
