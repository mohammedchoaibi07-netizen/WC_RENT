import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { AdminUser } from '@prisma/client';
import { AdminAuthService } from './admin-auth.service';
import { ROLES_KEY } from './roles.decorator';

export const ADMIN_SESSION_COOKIE = 'wcr_admin_session';

@Injectable()
export class AdminSessionGuard implements CanActivate {
  constructor(
    private readonly authService: AdminAuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest & { admin?: AdminUser; cookies: Record<string, string> }>();
    const token = request.cookies?.[ADMIN_SESSION_COOKIE];
    const admin = await this.authService.validateSession(token);
    if (!admin) throw new UnauthorizedException('Session administrateur invalide ou expiree.');

    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (requiredRoles?.length && !requiredRoles.includes(admin.role)) {
      throw new ForbiddenException("Role insuffisant pour cette action.");
    }

    request.admin = admin;
    return true;
  }
}
