import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception) => {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const request = context.switchToHttp().getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorType = 'InternalServerError';
        let extra: Record<string, any> = {};

        if (exception instanceof HttpException) {
          status = exception.getStatus();
          const response = exception.getResponse();

          if (typeof response === 'string') {
            message = response;
          } else if (typeof response === 'object') {
            const resObj = response as any;
            message = resObj.message ?? message;
            errorType = resObj.error ?? errorType;
            extra = resObj;
          }
        } else if (exception?.statusCode && exception?.message) {
          status = exception.statusCode;
          message = exception.message;
          errorType = exception.error_type ?? 'RpcException';
          extra = exception;
        }

        const errorResponse = {
          error: {
            type: 'about:blank',
            status: status,
            error_type: errorType,
            title: message,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(request),
            details: extra,
          },
        };

        return throwError(() => new HttpException(errorResponse, status));
      }),
    );
  }
}
