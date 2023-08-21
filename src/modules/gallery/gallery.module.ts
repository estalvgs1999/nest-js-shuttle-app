import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryImage } from './entities';
import { GalleryImageSchema } from './schemas';
import { FilesModule } from '../files/files.module';
import { GALLERY_REPOSITORY, GalleryMongoRepository } from './repositories';

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
  ],
})
export class GalleryModule {}
