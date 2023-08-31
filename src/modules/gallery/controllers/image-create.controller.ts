import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateImageDto } from '../dtos';
import { CreateImageService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesAzureService } from '../../files/services';
import { Roles } from '@Common/decorators';

@Controller({ path: 'gallery' })
export class CreateImageController {
  constructor(
    private readonly galleryService: CreateImageService,
    private readonly fileService: FilesAzureService,
  ) {}

  @Post('/upload')
  @Roles('Super')
  @UseInterceptors(FileInterceptor('image'))
  async createImage(
    @Query() imageDto: CreateImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const containerName = 'landingpage';
    const upload = await this.fileService.uploadFile(file, containerName);
    await this.galleryService.run({ ...imageDto, url: upload });
    return {
      upload,
      message: 'uploaded successfully',
    };
  }
}
