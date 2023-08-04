import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller({ path: 'auth' })
export class GoogleLoginController {
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req: Request): Promise<any> {
    const { user } = <any>req;
    // Aca se guarda la información del usuario para login o signup
    console.log(user);
    return { statusCode: HttpStatus.OK, data: user }; // Aca se enviaría un status que indica al frontend como se procede
  }
}
