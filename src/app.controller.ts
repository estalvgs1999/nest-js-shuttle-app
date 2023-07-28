import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'health' })
export class AppController {
  @Get()
  checkHealth() {
    return { status: 'ok' };
  }
}
