import { Controller, Get } from '@nestjs/common';
import { Public } from '@Common/decorators';

@Controller({ path: 'health' })
export class AppController {
  @Public()
  @Get()
  checkHealth() {
    return { status: 'ok' };
  }
}
