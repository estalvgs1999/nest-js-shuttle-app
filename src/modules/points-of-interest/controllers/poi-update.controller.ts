import {
  Body,
  Controller,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesAzureService } from '../../files/services';
import { Roles } from '../../../common/decorators';
import { UpdatePoiDto } from '../dtos';
import { UpdatePOIImageService, UpdatePOIService } from '../services';

@Controller({ path: 'points-of-interest' })
export class UpdatePOIController {
  constructor(
    private readonly poiService: UpdatePOIService,
    private readonly imageService: UpdatePOIImageService,
    private readonly fileService: FilesAzureService,
  ) {}

  @Patch('/:id/update/')
  @Roles('Super')
  updatePOI(@Param('id') id: string, @Body() updatePoiDto: UpdatePoiDto) {
    return this.poiService.run(id, updatePoiDto);
  }

  @Patch('/:id/upload/')
  @Roles('Super')
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
