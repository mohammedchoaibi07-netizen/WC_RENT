import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

@Injectable()
export class AdminAuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string): Promise<{ token: string; expiresAt: Date; admin: AdminUser }> {
    const admin = await this.prisma.adminUser.findUnique({ where: { email } });
    if (!admin || !admin.actif) throw new UnauthorizedException('Identifiants invalides.');

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) throw new UnauthorizedException('Identifiants invalides.');

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await this.prisma.adminSession.create({
      data: { tokenHash: hashToken(token), adminId: admin.id, expiresAt },
    });

    return { token, expiresAt, admin };
  }

  async logout(token: string): Promise<void> {
    await this.prisma.adminSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  }

  async validateSession(token: string | undefined): Promise<AdminUser | null> {
    if (!token) return null;
    const session = await this.prisma.adminSession.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { admin: true },
    });
    if (!session || session.expiresAt < new Date() || !session.admin.actif) return null;
    return session.admin;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
