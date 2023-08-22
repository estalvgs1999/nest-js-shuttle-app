import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GalleryImage } from '../schemas';
import { FilesAzureService } from 'src/modules/files/services';
import { GALLERY_REPOSITORY, GalleryRepository } from '../repositories';

@Injectable()
export class DeleteImageService {
  private readonly logger = new Logger(DeleteImageService.name);

  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: GalleryRepository,
    private readonly fileService: FilesAzureService,
  ) {}

  async run(id: string) {
    this.logger.log(`Deleting image with id: ${id}`);

    const count = await this.galleryRepository.countImages();

    if (count < 0) return;

    const image = await this.galleryRepository.findById(id);

    if (!image) throw new NotFoundException('Image not found');

    await this.removeImage(image);
    await this.galleryRepository.delete(id);
    await this.renumberImagePositions();

    return image;
  }

  private async removeImage(galleryImage: GalleryImage) {
    const containerName = 'landingpage';
    const fileUrl = galleryImage?.url;
    let oldUrl = '';

    if (fileUrl) oldUrl = fileUrl.split('/').pop();

    await this.fileService.deleteFile(oldUrl, containerName);
  }

  /**
   * The function renumbers the positions of images in a gallery.
   */
  private async renumberImagePositions() {
    const gallery = await this.galleryRepository.findAll();

    for (let counter = 0; counter < gallery.length; counter++) {
      const image = gallery[counter];
      await this.galleryRepository.updatePosition(image['_id'], counter + 1);
    }
  }
}
