import {
  CreateDriverService,
  DeleteDriverService,
  DriverVehicleAssignmentService,
  FindDriverService,
} from './services';
import { Driver, DriverSchema } from './schemas';
import { DRIVERS_REPOSITORY, DriversMongoRepository } from './repositories';
import { FindDriverController } from './controllers';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from '../vehicles/schemas';
import {
  VEHICLES_REPOSITORY,
  VehiclesMongoRepository,
} from '../vehicles/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriverSchema,
      },
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: DRIVERS_REPOSITORY,
      useClass: DriversMongoRepository,
    },
    {
      provide: VEHICLES_REPOSITORY,
      useClass: VehiclesMongoRepository,
    },
    CreateDriverService,
    FindDriverService,
    DriverVehicleAssignmentService,
    DeleteDriverService,
  ],
  controllers: [FindDriverController],
  exports: [DriverVehicleAssignmentService, DeleteDriverService],
})
export class DriversModule {}
