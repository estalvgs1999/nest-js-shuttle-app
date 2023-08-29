import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators';

@Controller({ path: 'health' })
export class AppController {
  @Public()
  @Get()
  checkHealth() {
    return { status: 'ok' };
  }
}
