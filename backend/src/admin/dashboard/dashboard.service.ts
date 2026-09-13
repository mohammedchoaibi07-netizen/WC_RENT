import { Injectable } from '@nestjs/common';
import { OrderStatus, QuoteStatus, ServiceVisitStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { startOfDay, addDays } from '../../availability/date.util';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const today = startOfDay(new Date());
    const tomorrow = addDays(today, 1);

    const [aLivrerAujourdhui, aEnleverAujourdhui, entretiensPrevus, devisNonTraites] = await Promise.all([
      this.prisma.order.findMany({
        where: { status: OrderStatus.planifiee, dateDebut: { gte: today, lt: tomorrow } },
        include: { customer: true },
      }),
      this.prisma.order.findMany({
        where: { status: { in: [OrderStatus.livree, OrderStatus.en_cours] }, dateFin: { gte: today, lt: tomorrow } },
        include: { customer: true },
      }),
      this.prisma.serviceVisit.findMany({
        where: { statut: ServiceVisitStatus.prevu, datePlanifiee: { gte: today, lt: tomorrow } },
        include: { order: true },
      }),
      this.prisma.quoteRequest.count({
        where: { statut: { in: [QuoteStatus.nouveau, QuoteStatus.en_cours] } },
      }),
    ]);

    return { aLivrerAujourdhui, aEnleverAujourdhui, entretiensPrevus, devisNonTraites };
  }
}
