import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schemas';
import { RIDES_REPOSITORY, RidesMongoRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ride.name,
        schema: RideSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: RIDES_REPOSITORY,
      useClass: RidesMongoRepository,
    },
  ],
  controllers: [],
  exports: [],
})
export class RidesModule {}
