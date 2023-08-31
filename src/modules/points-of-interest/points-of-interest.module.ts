import {
  CreatePOIController,
  DeletePOIController,
  FindPOIController,
  UpdatePOIController,
} from './controllers';
import {
  CreatePOIService,
  DeletePOIService,
  FindPOIService,
  UpdatePOIImageService,
  UpdatePOIService,
} from './services';
import { FilesModule } from '../files/files.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { POI } from './entities';
import { POI_REPOSITORY, POIMongoRepository } from './repositories';
import { POISchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: POI.name,
        schema: POISchema,
      },
    ]),
    FilesModule,
  ],
  providers: [
    {
      provide: POI_REPOSITORY,
      useClass: POIMongoRepository,
    },
    CreatePOIService,
    FindPOIService,
    UpdatePOIService,
    UpdatePOIImageService,
    DeletePOIService,
  ],
  controllers: [
    CreatePOIController,
    FindPOIController,
    UpdatePOIController,
    DeletePOIController,
  ],
})
export class PointsOfInterestModule {}
