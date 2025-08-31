/* eslint-disable */
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  Logger,
  RpcExceptionFilter,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements RpcExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const statusCode =
      (typeof exception.getStatus === 'function' ? exception.getStatus() : 0) ||
      422;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // early abort on 404
    if (statusCode === 404) {
      response.status(statusCode).json();
      return new Observable();
    }

    const request = ctx.getRequest<Request>();
    const message = exception.message as string;
    const correlationId = request.headers['x-correlation-id'];

    if (exception instanceof UnauthorizedException) {
      response.status(401).json({
        statusCode: 401,
        message,
      });
      return new Observable();
    }
    if (exception instanceof BadRequestException) {
      const resp = exception.getResponse();
      response.status(200).json({
        success: false,
        statusCode: 422,
        message,
        details: typeof resp === 'string' ? resp : resp['message'],
      });
      return new Observable();
    }
    if (
      exception instanceof ServiceUnavailableException &&
      request.url?.startsWith('/health')
    ) {
      response.status(503).json(exception);
      return new Observable();
    }
    this.logger.warn(`caught code: ${statusCode}, msg: ${message}`);
    response.status(200).json({
      success: false,
      statusCode,
      message,
      correlationId,
    });

    return new Observable();
  }
}
