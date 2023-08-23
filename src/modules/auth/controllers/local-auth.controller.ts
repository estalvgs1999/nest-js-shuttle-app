import { AuthService } from '../services';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dtos';
import { Tokens } from '../types';

@Controller({ path: 'auth' })
export class LocalAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  signupLocal(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }
}
