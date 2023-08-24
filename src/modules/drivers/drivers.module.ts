import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './schemas';
import { DRIVERS_REPOSITORY, DriversMongoRepository } from './repositories';
import {
  CreateDriverService,
  DeleteDriverService,
  AssignDriversVehicleService,
  FindDriverService,
} from './services';
import {
  AssignDriverVehicleController,
  FindDriverController,
} from './controllers';
import { VehiclesModule } from '../vehicles/vehicles.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriverSchema,
      },
    ]),
    forwardRef(() => VehiclesModule), // Circular dependency: https://docs.nestjs.com/fundamentals/circular-dependency#moduleref-class-alternative
  ],
  providers: [
    {
      provide: DRIVERS_REPOSITORY,
      useClass: DriversMongoRepository,
    },
    CreateDriverService,
    FindDriverService,
    AssignDriversVehicleService,
    DeleteDriverService,
  ],
  controllers: [AssignDriverVehicleController, FindDriverController],
  exports: [AssignDriversVehicleService, DeleteDriverService],
})
export class DriversModule {}
