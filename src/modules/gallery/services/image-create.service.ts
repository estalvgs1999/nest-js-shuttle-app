import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GALLERY_REPOSITORY, GalleryRepository } from '../repositories';
import { CreateImageDto } from '../dtos';
import { FilesAzureService } from 'src/modules/files/services';

@Injectable()
export class CreateImageService {
  private readonly logger = new Logger(CreateImageService.name);
  private readonly maxImages = 3;

  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: GalleryRepository,
    private readonly fileService: FilesAzureService,
  ) {}

  async run(imageDto: CreateImageDto) {
    this.logger.log('Creating gallery image...');

    const count = await this.galleryRepository.countImages();

    if (count >= this.maxImages) {
      this.removeImage(imageDto);
      throw new InternalServerErrorException(
        'Unable to add the image because the maximum limit has been reached. Please remove some images to add a new one.',
      );
    }

    return await this.galleryRepository.create({
      ...imageDto,
      position: count + 1,
    });
  }

  private async removeImage(imageDto: CreateImageDto) {
    const containerName = 'landingpage';
    const fileUrl = imageDto?.url;
    let oldUrl = '';

    if (fileUrl) oldUrl = fileUrl.split('/').pop();

    await this.fileService.deleteFile(oldUrl, containerName);
  }
}
