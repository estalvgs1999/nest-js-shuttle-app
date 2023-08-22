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

  async countImages(): Promise<number> {
    return await this.model.countDocuments();
  }

  async findById(id: string): Promise<GalleryImage> {
    return await this.model.findById(id);
  }

  async findAll(): Promise<GalleryImage[]> {
    const images = await this.model.find();
    images.sort((a, b) => a.position - b.position);
    return images;
  }

  async updatePosition(id: string, position: number): Promise<GalleryImage> {
    return await this.model.findByIdAndUpdate(
      id,
      { position: position },
      { new: true },
    );
  }

  async delete(id: string): Promise<GalleryImage> {
    return await this.model.findByIdAndDelete(id);
  }
}
