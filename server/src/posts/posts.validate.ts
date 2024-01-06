import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { PostCreateDTO, PostUpdateDTO } from './posts';

/**
 * 게시글 단건 생성 검증
 */
@Injectable()
export class ValidationPostCreateDTO
  implements PipeTransform<PostCreateDTO, PostCreateDTO>
{
  constructor() {
    this.exceptionFactory = (error) =>
      new HttpErrorByCode[HttpStatus.BAD_REQUEST](error);
  }

  protected exceptionFactory: (error: string) => any;

  transform(value: PostCreateDTO): PostCreateDTO {
    let invalidMsg: string;
    if (!this.isExist(value.title)) invalidMsg = '제목이 없습니다.';
    if (!this.isExist(value.content)) invalidMsg = '내용이 없습니다.';

    if (invalidMsg) {
      throw this.exceptionFactory(invalidMsg);
    }
    return value;
  }

  protected isExist(value: string): boolean {
    return !!value;
  }
}

/**
 * 게시글 단건 수정 검증
 */
@Injectable()
export class ValidationPostUpdateDTO
  implements PipeTransform<PostUpdateDTO, PostUpdateDTO>
{
  constructor() {
    this.exceptionFactory = (error) =>
      new HttpErrorByCode[HttpStatus.BAD_REQUEST](error);
  }

  protected exceptionFactory: (error: string) => any;

  transform(value: PostUpdateDTO): PostUpdateDTO {
    let invalidMsg: string;
    if (!this.isExist(value.title) && !this.isExist(value.content))
      invalidMsg = '업데이트 하려는 내용이 없습니다.';

    if (invalidMsg) {
      throw this.exceptionFactory(invalidMsg);
    }
    return value;
  }

  protected isExist(value: string): boolean {
    return !!value;
  }
}
