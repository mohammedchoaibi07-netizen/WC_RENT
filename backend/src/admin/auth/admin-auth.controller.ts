import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiExcludeController } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { AdminAuthService } from './admin-auth.service';
import { AdminSessionGuard, ADMIN_SESSION_COOKIE } from './admin-session.guard';
import { CurrentAdmin } from './current-admin.decorator';
import { AdminUser } from '@prisma/client';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function isProd() {
  return process.env.NODE_ENV === 'production';
}

@ApiExcludeController()
@Controller('api/admin/auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  @HttpCode(200)
  async login(
    @Body(new ZodValidationPipe(LoginSchema)) body: { email: string; password: string },
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { token, expiresAt, admin } = await this.authService.login(body.email, body.password);
    res.setCookie(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: isProd(),
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });
    return { id: admin.id, nom: admin.nom, email: admin.email, role: admin.role };
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(AdminSessionGuard)
  async logout(
    @Req() req: FastifyRequest & { cookies: Record<string, string> },
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const token = req.cookies?.[ADMIN_SESSION_COOKIE];
    if (token) await this.authService.logout(token);
    res.clearCookie(ADMIN_SESSION_COOKIE, { path: '/' });
    return { loggedOut: true };
  }

  @Get('me')
  @UseGuards(AdminSessionGuard)
  async me(@CurrentAdmin() admin: AdminUser) {
    return { id: admin.id, nom: admin.nom, email: admin.email, role: admin.role };
  }
}
