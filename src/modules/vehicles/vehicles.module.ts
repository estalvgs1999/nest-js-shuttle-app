import {
  CreateVehicleController,
  DeleteVehicleController,
  FindVehicleController,
  UpdateVehicleStatusController,
} from './controllers';
import {
  CreateVehicleService,
  DeleteVehicleService,
  FindVehicleService,
  UpdateVehicleService,
  VehicleDriverAssignmentService,
} from './services';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle } from './entities';
import { VEHICLES_REPOSITORY, VehiclesMongoRepository } from './repositories';
import { VehicleSchema } from './schemas';
import {
  DRIVERS_REPOSITORY,
  DriversMongoRepository,
} from '../drivers/repositories';
import { Driver, DriverSchema } from '../drivers/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
      {
        name: Driver.name,
        schema: DriverSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: VEHICLES_REPOSITORY,
      useClass: VehiclesMongoRepository,
    },
    {
      provide: DRIVERS_REPOSITORY,
      useClass: DriversMongoRepository,
    },
    CreateVehicleService,
    UpdateVehicleService,
    FindVehicleService,
    VehicleDriverAssignmentService,
    DeleteVehicleService,
  ],
  controllers: [
    CreateVehicleController,
    UpdateVehicleStatusController,
    FindVehicleController,
    DeleteVehicleController,
  ],
  exports: [VehicleDriverAssignmentService],
})
export class VehiclesModule {}
