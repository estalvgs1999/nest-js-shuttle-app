import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { CreateUserService } from '../services';

@Controller({ path: 'user' })
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('/create')
  create(@Body() userDto: CreateUserDto) {
    return this.service.run(userDto);
  }
}
