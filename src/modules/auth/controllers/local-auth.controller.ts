import { AuthDto } from '../dtos';
import { AuthService } from '../services';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../../users/dtos';
import { GetCurrentUser, GetCurrentUserId, Public } from '@Common/decorators';
import { RefreshTokenGuard } from '../guards';
import { Tokens } from '../types';

@Controller({ path: 'auth' })
export class LocalAuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @Post('/local/login')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signInLocal(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
