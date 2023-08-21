import { CreateImageDto } from '../dtos';
import { GalleryImage } from '../schemas';

export interface GalleryRepository {
  create(galleryImage: CreateImageDto): Promise<GalleryImage>;
  findAll(): Promise<GalleryImage[]>;
  delete(id: string): Promise<GalleryImage>;
}

export const GALLERY_REPOSITORY = 'GalleryRepository';
