import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesAzureService } from '../../../modules/files/services';
import { CreateImageService } from '../services';
import { CreateImageDto } from '../dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('gallery')
export class CreateImageController {
  constructor(
    private readonly galleryService: CreateImageService,
    private readonly fileService: FilesAzureService,
  ) {}

  @Post('/upload')
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
