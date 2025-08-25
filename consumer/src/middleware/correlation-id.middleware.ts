import { randomUUID } from 'node:crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = randomUUID();
    req.headers[CORRELATION_ID_HEADER] = correlationId;
    res.set(CORRELATION_ID_HEADER, correlationId);

    // tune headers
    res.removeHeader('Server');
    res.removeHeader('etag');
    res.setHeader('X-XSS-Protection', '1; mode=block');

    next();
  }
}
