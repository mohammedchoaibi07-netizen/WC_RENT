import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AdminUser } from '@prisma/client';
import { FastifyRequest } from 'fastify';

export const CurrentAdmin = createParamDecorator((_data: unknown, ctx: ExecutionContext): AdminUser => {
  const request = ctx.switchToHttp().getRequest<FastifyRequest & { admin?: AdminUser }>();
  return request.admin as AdminUser;
});
