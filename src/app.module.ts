import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configOptions, mongooseConfigAsync } from './common/config';

@Module({
	imports: [
		ConfigModule.forRoot(configOptions),
		MongooseModule.forRootAsync(mongooseConfigAsync),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
