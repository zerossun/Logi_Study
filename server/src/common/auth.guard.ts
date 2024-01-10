import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PUBLIC_METADATA_KEY } from './decorators/public.decorator';

export enum AccessableUserLastName {
  Kim = 'k',
  Choi = 'c',
  Min = 'm',
  Won = 'w',
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const accessedUser = request.header('User-Last-Name');

    const ACCESSABLE_USERS = [
      AccessableUserLastName.Choi,
      AccessableUserLastName.Kim,
      AccessableUserLastName.Min,
      AccessableUserLastName.Won,
    ] as string[];
    const isPublic = Reflect.getMetadata(
      PUBLIC_METADATA_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    if (ACCESSABLE_USERS.includes(accessedUser)) return true;

    throw new ForbiddenException('접근 권한이 없습니다!!');
  }
}
