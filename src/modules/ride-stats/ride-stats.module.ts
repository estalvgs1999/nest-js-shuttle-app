import { DriverStatsController } from './controllers';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DriverStatsController],
})
export class RideStatsModule {}
