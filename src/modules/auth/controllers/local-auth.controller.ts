import { AuthService } from '../services';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../users/dtos';
import { Tokens } from '../types';
import { AuthDto } from '../dtos';

@Controller({ path: 'auth' })
export class LocalAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  signUpLocal(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }

  @Post('/local/login')
  signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signInLocal(dto);
  }
}
