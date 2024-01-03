import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '서버와 통신을 할 수 있습니다.';
  }
}
