import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteImageService } from '../services';

@Controller('gallery')
export class DeleteImageController {
  constructor(private readonly galleryService: DeleteImageService) {}

  @Delete('/:id/delete')
  delete(@Param('id') id: string) {
    return this.galleryService.run(id);
  }
}
