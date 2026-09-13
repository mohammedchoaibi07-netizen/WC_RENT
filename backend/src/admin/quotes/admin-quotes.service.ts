import { Injectable } from '@nestjs/common';
import { QuoteStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuditLogService } from '../../common/audit/audit-log.service';

@Injectable()
export class AdminQuotesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLog: AuditLogService,
  ) {}

  async list(statut?: QuoteStatus) {
    return this.prisma.quoteRequest.findMany({
      where: { statut },
      orderBy: { createdAt: 'desc' },
    });
  }

  async setStatus(id: string, statut: QuoteStatus, adminId: string) {
    const quote = await this.prisma.quoteRequest.update({ where: { id }, data: { statut } });
    await this.auditLog.record({ adminId, action: 'quote_request.status_changed', entityType: 'QuoteRequest', entityId: id, details: { statut } });
    return quote;
  }
}
