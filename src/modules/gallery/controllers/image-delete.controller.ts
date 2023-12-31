import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteImageService } from '../services';
import { Roles } from '@Common/decorators';

@Controller({ path: 'gallery' })
export class DeleteImageController {
  constructor(private readonly galleryService: DeleteImageService) {}

  @Delete('/:id/delete')
  @Roles('Super')
  delete(@Param('id') id: string) {
    return this.galleryService.run(id);
  }
}
