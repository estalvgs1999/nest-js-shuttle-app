import * as passport from 'passport';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    passport.authenticate('headerapikey', (authorized: boolean) => {
      if (authorized) next();
      else throw new UnauthorizedException();
    })(req, res, next);
  }
}
