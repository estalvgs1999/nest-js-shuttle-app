import { FindDriverController } from './controllers';
import {
  CreateDriverService,
  DeleteDriverService,
  DriverVehicleAssignmentService,
  FindDriverService,
} from './services';
import { Driver, DriverSchema } from './schemas';
import { DRIVERS_REPOSITORY, DriversMongoRepository } from './repositories';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
    DriverVehicleAssignmentService,
    DeleteDriverService,
  ],
  controllers: [FindDriverController],
  exports: [DriverVehicleAssignmentService, DeleteDriverService],
})
export class DriversModule {}
