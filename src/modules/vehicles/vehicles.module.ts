import { Module, forwardRef } from '@nestjs/common';
import { Vehicle } from './entities';
import { VehicleSchema } from './schemas';
import { VEHICLES_REPOSITORY, VehiclesMongoRepository } from './repositories';
import {
  CreateVehicleService,
  DeleteVehicleService,
  FindVehicleService,
  UpdateVehicleService,
  VehicleAssignmentService,
} from './services';
import {
  CreateVehicleController,
  DeleteVehicleController,
  FindVehicleController,
  UpdateVehicleStatusController,
} from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
    ]),
    forwardRef(() => DriversModule), // Circular dependency: https://docs.nestjs.com/fundamentals/circular-dependency#moduleref-class-alternative
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
    DeleteVehicleService,
  ],
  controllers: [
    CreateVehicleController,
    UpdateVehicleStatusController,
    FindVehicleController,
    DeleteVehicleController,
  ],
  exports: [VehicleAssignmentService],
})
export class VehiclesModule {}
