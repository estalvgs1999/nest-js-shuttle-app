import { Driver, DriverSchema } from '../drivers/schemas';
import { DriverRideStatsService, DriverTenureService } from './services';
import {
  DRIVERS_REPOSITORY,
  DriversMongoRepository,
} from '../drivers/repositories';
import { DriverStatsController } from './controllers';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from '../rides/schemas';
import { RIDES_REPOSITORY, RidesMongoRepository } from '../rides/repositories';
import { RidesModule } from '../rides/rides.module';

@Module({
  controllers: [DriverStatsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Ride.name,
        schema: RideSchema,
      },
      {
        name: Driver.name,
        schema: DriverSchema,
      },
    ]),
    RidesModule,
  ],
  providers: [
    {
      provide: RIDES_REPOSITORY,
      useClass: RidesMongoRepository,
    },
    {
      provide: DRIVERS_REPOSITORY,
      useClass: DriversMongoRepository,
    },
    DriverTenureService,
    DriverRideStatsService,
  ],
})
export class RideStatsModule {}
