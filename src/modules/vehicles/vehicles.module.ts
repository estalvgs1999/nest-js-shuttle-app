import { Module } from '@nestjs/common';
import { Vehicle } from './entities';
import { VehicleSchema } from './schemas';
import { VEHICLES_REPOSITORY, VehiclesMongoRepository } from './repositories';
import {
  CreateVehicleService,
  FindVehicleService,
  UpdateVehicleService,
  VehicleAssignmentService,
} from './services';
import {
  CreateVehicleController,
  FindVehicleController,
  UpdateVehicleStatusController,
} from './controllers';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: VEHICLES_REPOSITORY,
      useClass: VehiclesMongoRepository,
    },
    CreateVehicleService,
    UpdateVehicleService,
    FindVehicleService,
    VehicleAssignmentService,
  ],
  controllers: [
    CreateVehicleController,
    UpdateVehicleStatusController,
    FindVehicleController,
  ],
  exports: [VehicleAssignmentService],
})
export class VehiclesModule {}
