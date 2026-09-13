import { Injectable } from '@nestjs/common';
import { OrderStatus, ServiceVisitStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuditLogService } from '../../common/audit/audit-log.service';

@Injectable()
export class PlanningService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLog: AuditLogService,
  ) {}

  async week(from: Date, to: Date) {
    const [livraisons, enlevements, entretiens] = await Promise.all([
      this.prisma.order.findMany({
        where: { status: OrderStatus.planifiee, dateDebut: { gte: from, lte: to } },
        include: { customer: true },
      }),
      this.prisma.order.findMany({
        where: { status: { in: [OrderStatus.livree, OrderStatus.en_cours] }, dateFin: { gte: from, lte: to } },
        include: { customer: true },
      }),
      this.prisma.serviceVisit.findMany({
        where: { datePlanifiee: { gte: from, lte: to } },
        include: { order: { include: { customer: true } } },
      }),
    ]);

    return { livraisons, enlevements, entretiens };
  }

  async assignTechnician(serviceVisitId: string, technicien: string, adminId: string) {
    const visit = await this.prisma.serviceVisit.update({
      where: { id: serviceVisitId },
      data: { technicien },
    });
    await this.auditLog.record({
      adminId,
      action: 'service_visit.technician_assigned',
      entityType: 'ServiceVisit',
      entityId: serviceVisitId,
      details: { technicien },
    });
    return visit;
  }

  async markVisitDone(serviceVisitId: string, adminId: string, note?: string, photoUrl?: string) {
    const visit = await this.prisma.serviceVisit.update({
      where: { id: serviceVisitId },
      data: { statut: ServiceVisitStatus.effectue, note, photoUrl },
    });
    await this.auditLog.record({ adminId, action: 'service_visit.completed', entityType: 'ServiceVisit', entityId: serviceVisitId });
    return visit;
  }
}
