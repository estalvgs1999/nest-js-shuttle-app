import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities';
import { UserSchema } from './schemas';
import { USERS_REPOSITORY, UsersMongoRepository } from './repositories';
import {
  CreateUserService,
  DeleteUserService,
  FindUsersService,
  UpdateUserService,
} from './services';
import {
  CreateUserController,
  DeleteUserController,
  FindUserController,
  UpdateUserController,
} from './controllers';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    DriversModule,
  ],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersMongoRepository,
    },
    CreateUserService,
    FindUsersService,
    UpdateUserService,
    DeleteUserService,
  ],
  controllers: [
    CreateUserController,
    FindUserController,
    UpdateUserController,
    DeleteUserController,
  ],
})
export class UsersModule {}
