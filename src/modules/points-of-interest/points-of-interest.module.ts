import { Module } from '@nestjs/common';
import { POI } from './entities';
import { POISchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { POIMongoRepository, POI_REPOSITORY } from './repositories';
import { CreatePOIService } from './services';
import { CreatePOIController } from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: POI.name,
        schema: POISchema,
      },
    ]),
  ],
  providers: [
    {
      provide: POI_REPOSITORY,
      useClass: POIMongoRepository,
    },
    CreatePOIService,
  ],
  controllers: [CreatePOIController],
})
export class PointsOfInterestModule {}
