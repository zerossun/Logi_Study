import { Module } from '@nestjs/common';
import {
  ErrorsInterceptor,
  TransformInterceptor,
} from './http/transform.interceptor';

@Module({
  providers: [TransformInterceptor, ErrorsInterceptor],
})
export class CommonModule {}
