import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuditLogService } from '../../common/audit/audit-log.service';

export interface NewPriceListInput {
  validFrom: Date;
  prixSemaineCabine: number;
  prixPassageEntretien: number;
  prixLivraisonForfait: number;
  remiseSocietePct: number;
  tvaPct: number;
}

@Injectable()
export class AdminPricingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLog: AuditLogService,
  ) {}

  async list() {
    return this.prisma.priceList.findMany({ orderBy: { validFrom: 'desc' } });
  }

  /**
   * Cree une nouvelle grille tarifaire a effet immediat ou futur, sans
   * jamais modifier l'historique (les commandes deja passees restent liees
   * a la grille en vigueur au moment de leur creation).
   */
  async create(input: NewPriceListInput, adminId: string) {
    return this.prisma.$transaction(async (tx) => {
      const current = await tx.priceList.findFirst({
        where: { validUntil: null },
        orderBy: { validFrom: 'desc' },
      });
      if (current) {
        await tx.priceList.update({ where: { id: current.id }, data: { validUntil: input.validFrom } });
      }
      const created = await tx.priceList.create({
        data: { ...input, createdBy: adminId },
      });
      await this.auditLog.record({ adminId, action: 'price_list.created', entityType: 'PriceList', entityId: created.id, details: input as any });
      return created;
    });
  }
}
