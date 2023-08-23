import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserService } from '../services';
import { UpdateUserDto } from '../dtos';
import { User } from '../entities';

@Controller({ path: 'user' })
export class UpdateUserController {
  constructor(private readonly service: UpdateUserService) {}

  @Patch('/update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.service.run(id, updateUserDto);
  }
}
