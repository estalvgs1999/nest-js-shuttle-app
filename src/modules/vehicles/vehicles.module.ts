import { Module } from '@nestjs/common';
import { Vehicle } from './entities';
import { VehicleSchema } from './schemas';
import { VEHICLES_REPOSITORY, VehiclesMongoRepository } from './repositories';
import { CreateVehicleService } from './services';
import { CreateVehicleController } from './controllers';
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
  ],
  controllers: [CreateVehicleController],
})
export class VehiclesModule {}
