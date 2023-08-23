import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../services';
import { CreateUserDto } from '../dtos';

@Controller({ path: 'user' })
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('/create')
  create(@Body() userDto: CreateUserDto) {
    return this.service.run(userDto);
  }
}
