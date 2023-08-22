import { Inject, Injectable, Logger } from '@nestjs/common';
import { GALLERY_REPOSITORY, GalleryRepository } from '../repositories';

@Injectable()
export class FindImageService {
  private readonly logger = new Logger(FindImageService.name);

  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: GalleryRepository,
  ) {}

  async run() {
    return await this.galleryRepository.findAll();
  }
}
