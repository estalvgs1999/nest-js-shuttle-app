import { Module } from '@nestjs/common';
import { FilesAzureService } from './services';

@Module({
  providers: [FilesAzureService],
})
export class FilesModule {}
