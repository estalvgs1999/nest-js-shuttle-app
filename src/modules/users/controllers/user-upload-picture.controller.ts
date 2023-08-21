import {
  Controller,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserPictureService } from '../services';
import { FilesAzureService } from 'src/modules/files/services';

@Controller({ path: 'user' })
export class UploadUserProfilePictureController {
  constructor(
    private readonly userService: UpdateUserPictureService,
    private readonly fileService: FilesAzureService,
  ) {}

  @Patch('/:id/upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePicture(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const containerName = 'profile';
    const upload = await this.fileService.uploadFile(file, containerName);
    return this.userService.run(userId, upload);
  }
}
