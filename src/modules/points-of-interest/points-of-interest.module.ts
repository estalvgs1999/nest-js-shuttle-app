import { Module } from '@nestjs/common';
import { POI } from './entities';
import { POISchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { POIMongoRepository, POI_REPOSITORY } from './repositories';
import {
  CreatePOIService,
  DeletePOIService,
  FindPOIService,
  UpdatePOIImageService,
  UpdatePOIService,
} from './services';
import {
  CreatePOIController,
  DeletePOIController,
  FindPOIController,
  UpdatePOIController,
} from './controllers';
import { FilesModule } from '../files/files.module';

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
