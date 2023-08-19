import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './schemas';
import { DRIVERS_REPOSITORY, DriversMongoRepository } from './repositories';
import {
  CreateDriverService,
  DriversVehicleService,
  FindDriverService,
} from './services';
import {
  AssignDriverVehicleController,
  FindDriverController,
} from './controllers';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriverSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: DRIVERS_REPOSITORY,
      useClass: DriversMongoRepository,
    },
    CreateDriverService,
    FindDriverService,
    DriversVehicleService,
  ],
  controllers: [AssignDriverVehicleController, FindDriverController],
})
export class DriversModule {}
