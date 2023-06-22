import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configOptions, mongooseConfigAsync } from './common/config';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongooseConfigAsync),
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
