import { Module } from '@nestjs/common';
import { RoutesService } from './services';

@Module({
  providers: [RoutesService],
  exports: [RoutesService],
})
export class RoutesModule {}
