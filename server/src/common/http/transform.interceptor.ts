import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ServerResponse } from 'http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const serverResponse = _context.getArgByIndex(1) as ServerResponse;
    const method = serverResponse.req.method;

    const httpMethodResponseMap = {
      GET: '데이터 조회에 성공했습니다',
      POST: '데이터 생성에 성공했습니다',
      PUT: '데이터 수정에 성공했습니다',
      DELETE: '데이터 삭제에 성공했습니다',
    };

    return next.handle().pipe(
      map((data) => {
        console.log(data);
        return {
          data,
          statusCode: HttpStatus.OK,
          message: httpMethodResponseMap[method],
        };
      }),
    );
  }
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) =>
        throwError(() => {
          return error;
        }),
      ),
    );
  }
}
