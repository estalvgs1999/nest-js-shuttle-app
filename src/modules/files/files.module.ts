import { ConfigModule } from '@nestjs/config';
import { FilesAzureService } from './services';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [FilesAzureService],
  exports: [FilesAzureService],
})
export class FilesModule {}
