import { Module } from '@nestjs/common';
import { FilesAzureService } from './services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [FilesAzureService],
  exports: [FilesAzureService],
})
export class FilesModule {}
