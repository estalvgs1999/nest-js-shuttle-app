import {
  CreateUserController,
  DeleteUserController,
  FindUserController,
  ProfilePictureController,
  UpdateUserController,
} from './controllers';
import {
  CreateUserService,
  DeleteUserService,
  FindUsersService,
  UpdateProfilePictureService,
  UpdateUserService,
  UserRefreshTokenService,
  ValidateUserService,
} from './services';
import { DriversModule } from '../drivers/drivers.module';
import { FilesModule } from '../files/files.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities';
import { USERS_REPOSITORY, UsersMongoRepository } from './repositories';
import { UserSchema } from './schemas';

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
    UpdateProfilePictureService,
    DeleteUserService,
    ValidateUserService,
    UserRefreshTokenService,
  ],
  controllers: [
    CreateUserController,
    FindUserController,
    UpdateUserController,
    ProfilePictureController,
    DeleteUserController,
  ],
  exports: [
    CreateUserService,
    ValidateUserService,
    UserRefreshTokenService,
    FindUsersService,
  ],
})
export class UsersModule {}
