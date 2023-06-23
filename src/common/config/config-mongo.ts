import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseConfigAsync: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get('MONGO_URI'),
    auth: {
      username: configService.get('MONGO_USERNAME'),
      password: configService.get('MONGO_PASSWORD'),
    },
  }),
  inject: [ConfigService],
};
