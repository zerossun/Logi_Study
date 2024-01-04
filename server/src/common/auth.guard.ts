import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const accessedUser = request.header('user');
    const ACCESSABLE_USERS = ['m', 'k', 'c', 'w'];

    if (ACCESSABLE_USERS.includes(accessedUser)) return true;

    throw new ForbiddenException('접근 권한이 없습니다!!');
  }
}
