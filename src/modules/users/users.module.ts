import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities';
import { UserSchema } from './schemas';
import { USERS_REPOSITORY, UsersMongoRepository } from './repositories';
import {
  CreateUserService,
  DeleteUserService,
  FindUsersService,
  UpdateProfilePictureService,
  UpdateUserService,
} from './services';
import {
  CreateUserController,
  DeleteUserController,
  FindUserController,
  UpdateUserController,
  ProfilePictureController,
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
    UpdateProfilePictureService,
    DeleteUserService,
  ],
  controllers: [
    CreateUserController,
    FindUserController,
    UpdateUserController,
    ProfilePictureController,
    DeleteUserController,
  ],
})
export class UsersModule {}
