import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/filters';
import { TimeoutInterceptor } from './common/interceptors';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.useLogger(app.get(Logger));

  await app.listen(port);
}
bootstrap();
