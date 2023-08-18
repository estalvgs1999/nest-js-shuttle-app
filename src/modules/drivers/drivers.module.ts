import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './schemas';
import { DRIVERS_REPOSITORY, DriversMongoRepository } from './repositories';
import { CreateDriverService } from './services';

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
  ],
})
export class DriversModule {}
