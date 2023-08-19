import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUserService } from '../services';

@Controller({ path: 'user' })
export class DeleteUserController {
  constructor(private readonly service: DeleteUserService) {}

  @Delete('/delete/:id')
  create(@Param('id') userId: string) {
    return this.service.run(userId);
  }
}
