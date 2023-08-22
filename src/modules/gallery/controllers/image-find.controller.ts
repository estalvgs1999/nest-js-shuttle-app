import { Controller, Get } from '@nestjs/common';
import { FindImageService } from '../services';

@Controller('gallery')
export class FindGalleryController {
  constructor(private readonly galleryService: FindImageService) {}

  @Get()
  findAll() {
    return this.galleryService.run();
  }
}
