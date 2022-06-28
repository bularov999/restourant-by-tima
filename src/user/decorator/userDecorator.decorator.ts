import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
export const UserDecorator = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) return null;

    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
