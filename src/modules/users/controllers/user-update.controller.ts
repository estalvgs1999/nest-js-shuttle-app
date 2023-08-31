import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from '../dtos';
import { UpdateUserService } from '../services';
import { User } from '../entities';

@Controller({ path: 'user' })
export class UpdateUserController {
  constructor(private readonly service: UpdateUserService) {}

  @Patch('/:id/update')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.service.run(id, updateUserDto);
  }
}
