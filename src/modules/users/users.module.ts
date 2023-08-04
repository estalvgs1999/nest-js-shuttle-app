import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities';
import { UserSchema } from './schemas';
import { USERS_REPOSITORY, UsersMongoRepository } from './repositories';
import {
  CreateUserService,
  FindUsersService,
  UpdateUserService,
} from './services';
import { CreateUserController, FindUserController } from './controllers';
import { UpdateUserController } from './controllers/user-update.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersMongoRepository,
    },
    CreateUserService,
    FindUsersService,
    UpdateUserService,
  ],
  controllers: [CreateUserController, FindUserController, UpdateUserController],
})
export class UsersModule {}
