import { Controller, Get } from '@nestjs/common';
import { FindImageService } from '../services';
import { Public } from '@Common/decorators';

@Controller({ path: 'gallery' })
export class FindGalleryController {
  constructor(private readonly galleryService: FindImageService) {}

  @Public()
  @Get()
  findAll() {
    return this.galleryService.run();
  }
}
