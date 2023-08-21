import { InjectModel } from '@nestjs/mongoose';
import { GalleryRepository } from './gallery.repository';
import { GalleryImage, GalleryImageModel } from '../schemas';
import { CreateImageDto } from '../dtos';

export class GalleryMongoRepository implements GalleryRepository {
  constructor(
    @InjectModel(GalleryImage.name)
    private readonly model: GalleryImageModel,
  ) {}

  async create(galleryImage: CreateImageDto): Promise<GalleryImage> {
    const newImage = await new this.model(galleryImage).save();
    return newImage;
  }

  async findAll(): Promise<GalleryImage[]> {
    return await this.model.find();
  }

  async delete(id: string): Promise<GalleryImage> {
    return await this.model.findByIdAndDelete(id);
  }
}
