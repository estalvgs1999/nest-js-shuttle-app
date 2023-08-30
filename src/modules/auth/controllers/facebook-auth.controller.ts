import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { Public } from '@Common/decorators';
import { Request } from 'express';

@Controller({ path: 'auth' })
export class FacebookAuthController {
  @Public()
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Public()
  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    const { user } = <any>req;
    // Aca se guarda la información del usuario para login o signup
    console.log(user);
    return { statusCode: HttpStatus.OK, data: user }; // Aca se enviaría un status que indica al frontend como se procede
  }
}
