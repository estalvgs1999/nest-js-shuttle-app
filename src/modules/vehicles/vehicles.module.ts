import { Module } from '@nestjs/common';
import { Vehicle } from './entities';
import { VehicleSchema } from './schemas';
import { VEHICLES_REPOSITORY, VehiclesMongoRepository } from './repositories';
import {
  CreateVehicleService,
  FindVehicleService,
  UpdateVehicleStatusService,
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
    UpdateVehicleStatusService,
    FindVehicleService,
  ],
  controllers: [
    CreateVehicleController,
    UpdateVehicleStatusController,
    FindVehicleController,
  ],
})
export class VehiclesModule {}
