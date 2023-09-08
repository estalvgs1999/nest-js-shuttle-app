import { FilesAzureService } from '../../files/services';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserService } from './user-update.service';
import { UserRole } from '../enums';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';

@Injectable()
export class UpdateProfilePictureService {
  private readonly logger = new Logger(UpdateProfilePictureService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly userUpdateService: UpdateUserService,
    private readonly fileService: FilesAzureService,
  ) {}

  async saveUrl(userId: string, pictureUrl: string, containerName: string) {
    this.logger.log('Updating user profile picture.');
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    const fileUrl = user?.profilePicture;
    let oldUrl = '';

    if (fileUrl) oldUrl = fileUrl.split('/').pop();

    await this.fileService.deleteFile(oldUrl, containerName);
    const updatedUser = await this.usersRepository.updateProfilePicture(
      userId,
      pictureUrl,
    );

    if (user.role === UserRole.Tourist)
      this.userUpdateService.updateBookings(updatedUser);

    return updatedUser;
  }

  async remove(userId: string, containerName: string) {
    this.logger.log('Removing user profile picture.');

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    const fileUrl = user?.profilePicture;

    if (!fileUrl) return user;

    await this.usersRepository.updateProfilePicture(userId, '');

    const file = fileUrl.split('/').pop();
    await this.fileService.deleteFile(file, containerName);

    return user;
  }
}
