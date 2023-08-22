import { CreateImageDto } from '../dtos';
import { GalleryImage } from '../schemas';

export interface GalleryRepository {
  create(galleryImage: CreateImageDto): Promise<GalleryImage>;
  countImages(): Promise<number>;
  findById(id: string): Promise<GalleryImage>;
  findAll(): Promise<GalleryImage[]>;
  updatePosition(id: string, position: number): Promise<GalleryImage>;
  delete(id: string): Promise<GalleryImage>;
}

export const GALLERY_REPOSITORY = 'GalleryRepository';
