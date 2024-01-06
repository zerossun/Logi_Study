import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Optional,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

/**
 * 커스텀한 메시지를 받는 pipe
 */
@Injectable()
export class ValidationPipeWithMessage<T, R>
  implements PipeTransform<T, Promise<R>>
{
  constructor(
    private readonly validatePipe: PipeTransform<T, Promise<R>>,
    @Optional() protected readonly customErrorMessage?: string,
  ) {}

  async transform(value: T, metadata: ArgumentMetadata): Promise<R> {
    try {
      return await this.validatePipe.transform(value, metadata);
    } catch (error) {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST](
        this.customErrorMessage || error?.message,
      );
    }
  }
}

/**
 * 숫자인지 검증하는 pipe
 */
@Injectable()
export class ParseIntPipeKr extends ValidationPipeWithMessage<string, number> {
  constructor() {
    super(new ParseIntPipe(), '숫자 입력해라');
  }
}

/**
 * 최소 숫자보다 큰지 검증하는 pipe
 */
@Injectable()
export class ParseMinIntPipeKr
  implements PipeTransform<string, Promise<number>>
{
  protected exceptionFactory: (error: string) => any;

  constructor(
    protected readonly minInt: number,
    @Optional() protected readonly customErrorMessage?: string,
  ) {
    this.exceptionFactory = (error) =>
      new HttpErrorByCode[HttpStatus.BAD_REQUEST](error);
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const parseIntPipeKr = new ParseIntPipeKr();

    //숫자인지 검증
    const rtnValue = await parseIntPipeKr.transform(value, metadata);

    //값이 최소값보다 넘었는지 확인
    if (!this.isOver(rtnValue)) {
      throw this.exceptionFactory(
        this.customErrorMessage || `${this.minInt} 보다 큰 값 넣어라`,
      );
    }

    return rtnValue;
  }

  protected isOver(value: number): boolean {
    return value > this.minInt;
  }
}
