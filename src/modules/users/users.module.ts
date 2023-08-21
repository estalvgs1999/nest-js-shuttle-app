import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities';
import { UserSchema } from './schemas';
import { USERS_REPOSITORY, UsersMongoRepository } from './repositories';
import {
  CreateUserService,
  DeleteUserService,
  FindUsersService,
  UpdateUserPictureService,
  UpdateUserService,
} from './services';
import {
  CreateUserController,
  DeleteUserController,
  FindUserController,
  UpdateUserController,
  UploadUserProfilePictureController,
} from './controllers';
import { DriversModule } from '../drivers/drivers.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    DriversModule,
    FilesModule,
  ],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersMongoRepository,
    },
    CreateUserService,
    FindUsersService,
    UpdateUserService,
    UpdateUserPictureService,
    DeleteUserService,
  ],
  controllers: [
    CreateUserController,
    FindUserController,
    UpdateUserController,
    UploadUserProfilePictureController,
    DeleteUserController,
  ],
})
export class UsersModule {}
