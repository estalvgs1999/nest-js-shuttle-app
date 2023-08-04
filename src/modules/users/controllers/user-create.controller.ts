import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../services';
import { CreateUserDTO } from '../dtos';

@Controller({ path: 'user' })
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('/create')
  create(@Body() userDTO: CreateUserDTO) {
    return this.service.run(userDTO);
  }
}
