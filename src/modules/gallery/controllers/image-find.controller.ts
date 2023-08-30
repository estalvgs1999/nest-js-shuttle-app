import { Controller, Get } from '@nestjs/common';
import { FindImageService } from '../services';
import { Public } from 'src/common/decorators';

@Controller('gallery')
export class FindGalleryController {
  constructor(private readonly galleryService: FindImageService) {}

  @Public()
  @Get()
  findAll() {
    return this.galleryService.run();
  }
}
