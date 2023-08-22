import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GALLERY_REPOSITORY, GalleryRepository } from '../repositories';
import { CreateImageDto } from '../dtos';

@Injectable()
export class CreateImageService {
  private readonly logger = new Logger(CreateImageService.name);
  private readonly maxImages = 3;

  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: GalleryRepository,
  ) {}

  async run(imageDTO: CreateImageDto) {
    this.logger.log('Creating gallery image...');

    const count = await this.galleryRepository.countImages();

    if (count >= this.maxImages)
      throw new InternalServerErrorException(
        'Unable to add the image because the maximum limit has been reached. Please remove some images to add a new one.',
      );

    return await this.galleryRepository.create(imageDTO);
  }
}
