import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp();
    const statusCode = request.getResponse().statusCode;

    return next.handle().pipe(
      map((data) => {
        if (data.response) {
          return {
            message: data?.message,
            statusCode: data?.status,
            data: data.response,
          };
        }
        
        return {
          message: data?.message ?? 'Success',
          statusCode: data?.statusCode ?? statusCode,
          data: data?.data ?? data,
          meta: data?.meta,
        };
      }),
    );
  }
}
