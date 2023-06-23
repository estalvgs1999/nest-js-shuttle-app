import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

export const CORRELATION_ID_KEY = 'X-Correlation-Id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const correlationHeader = req.header(CORRELATION_ID_KEY) || randomUUID();
    req.headers[CORRELATION_ID_KEY] = correlationHeader;
    res.set(CORRELATION_ID_KEY, correlationHeader);
    next();
  }
}
