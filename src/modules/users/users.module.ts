import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities';
import { UserSchema } from './schemas';
import { USERS_REPOSITORY, UsersMongoRepository } from './repositories';
import { CreateUserController } from './controllers/user-create.controller';
import { CreateUserService } from './services';

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
  ],
  controllers: [CreateUserController],
})
export class UsersModule {}
