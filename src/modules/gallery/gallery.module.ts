import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryImage } from './entities';
import { GalleryImageSchema } from './schemas';
import { FilesModule } from '../files/files.module';
import { GALLERY_REPOSITORY, GalleryMongoRepository } from './repositories';
import {
  CreateImageService,
  DeleteImageService,
  FindImageService,
} from './services';
import {
  CreateImageController,
  DeleteImageController,
  FindGalleryController,
} from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GalleryImage.name,
        schema: GalleryImageSchema,
      },
    ]),
    FilesModule,
  ],
  providers: [
    {
      provide: GALLERY_REPOSITORY,
      useClass: GalleryMongoRepository,
    },
    CreateImageService,
    FindImageService,
    DeleteImageService,
  ],
  controllers: [
    CreateImageController,
    FindGalleryController,
    DeleteImageController,
  ],
})
export class GalleryModule {}
