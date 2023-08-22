import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '../entities';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';
import { DeleteDriverEvent } from '../../drivers/events';
import { UserRole } from '../enums';
import { DeleteDriverService } from '../../drivers/services';
import { FilesAzureService } from '../../files/services';

@Injectable()
export class DeleteUserService {
  private readonly logger = new Logger(DeleteUserService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly deleteDriverService: DeleteDriverService,
    private readonly fileService: FilesAzureService,
  ) {}

  async run(userId: string): Promise<User> {
    this.logger.log(`Deleting user ${userId}`);

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }

    await this.removeProfilePicture(user);

    if (user.role === UserRole.Driver) await this.deleteDriver(userId);

    await this.usersRepository.delete(userId);
    this.logger.log('User deleted');

    return user;
  }

  private async removeProfilePicture(user: User) {
    const containerName = 'profile';
    const fileUrl = user?.profilePicture;
    let oldUrl = '';

    if (fileUrl) oldUrl = fileUrl.split('/').pop();

    await this.fileService.deleteFile(oldUrl, containerName);
  }

  private async deleteDriver(userId: string) {
    this.logger.log('Emitting delete driver event');
    await this.deleteDriverService.run(new DeleteDriverEvent(userId));
  }
}
