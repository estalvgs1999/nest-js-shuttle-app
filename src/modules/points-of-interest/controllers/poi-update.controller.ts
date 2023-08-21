import {
  Controller,
  Patch,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UpdatePoiDTO } from '../dtos';
import { UpdatePOIImageService, UpdatePOIService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesAzureService } from '../../../modules/files/services';

@Controller({ path: 'points-of-interest' })
export class UpdatePOIController {
  constructor(
    private readonly poiService: UpdatePOIService,
    private readonly imageService: UpdatePOIImageService,
    private readonly fileService: FilesAzureService,
  ) {}

  @Patch('/:id/update/')
  updatePOI(@Param('id') id: string, @Body() updatePoiDTO: UpdatePoiDTO) {
    return this.poiService.run(id, updatePoiDTO);
  }

  @Patch('/:id/upload/')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const containerName = 'pois';
    const upload = await this.fileService.uploadFile(file, containerName);
    await this.imageService.run(id, upload);
    return {
      upload,
      message: 'uploaded successfully',
    };
  }
}
