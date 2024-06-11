import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { LoggerService } from '../logger/logger.service';

  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;
      const now = Date.now();
               
      return next.handle().pipe(
        tap((data) => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
          const duration = Date.now() - now;
          const logMessage = `Response: ${method} ${url} ${statusCode} - ${duration}ms\nResponse Body: ${JSON.stringify(data)}`;
          this.logger.log(logMessage);
        }),
      );
    }
  }
  