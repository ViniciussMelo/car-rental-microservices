import {
  CallHandler,
  ExecutionContext,
  HttpException,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

import { AppError } from '@errors/app.error';
import { DateFormat } from '@shared/date-format.shared';

export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof AppError || error instanceof HttpException) {
          return throwError(() => error);
        }

        const date = DateFormat.formatDate(new Date());

        console.error(`[${date}] - [Internal Server Error]: ${error.message}`);

        return throwError(
          () => new InternalServerErrorException('Internal server error'),
        );
      }),
    );
  }
}
