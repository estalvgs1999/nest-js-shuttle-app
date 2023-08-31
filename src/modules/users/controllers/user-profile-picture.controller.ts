import {
  Controller,
  Delete,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesAzureService } from '../../files/services';
import { UpdateProfilePictureService } from '../services';

@Controller({ path: 'user' })
export class ProfilePictureController {
  constructor(
    private readonly userService: UpdateProfilePictureService,
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
    await this.userService.saveUrl(userId, upload, containerName);
    return {
      upload,
      message: 'uploaded successfully',
    };
  }

  @Delete('/:id/remove')
  async removeProfilePicture(@Param('id') userId: string) {
    const containerName = 'profile';
    await this.userService.remove(userId, containerName);
    return {
      userId,
      message: 'deleted successfully',
    };
  }
}
