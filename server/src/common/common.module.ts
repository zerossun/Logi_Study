import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ErrorsInterceptor } from './error.interceptor';
import { TransformInterceptor } from './transform.interceptor';

@Module({
  providers: [TransformInterceptor, ErrorsInterceptor, AuthGuard],
})
export class CommonModule {}
