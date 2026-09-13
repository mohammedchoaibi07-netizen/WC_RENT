import { Injectable } from '@nestjs/common';
import { UnitState } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuditLogService } from '../../common/audit/audit-log.service';

@Injectable()
export class FleetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLog: AuditLogService,
  ) {}

  async list() {
    return this.prisma.unit.findMany({ orderBy: { code: 'asc' } });
  }

  async create(code: string, adminId: string) {
    const unit = await this.prisma.unit.create({ data: { code } });
    await this.auditLog.record({ adminId, action: 'unit.created', entityType: 'Unit', entityId: unit.id, details: { code } });
    return unit;
  }

  async setState(id: string, etat: UnitState, adminId: string, notes?: string) {
    const unit = await this.prisma.unit.update({
      where: { id },
      data: { etat, notes, dernierControle: etat === UnitState.disponible ? new Date() : undefined },
    });
    await this.auditLog.record({ adminId, action: 'unit.state_changed', entityType: 'Unit', entityId: id, details: { etat, notes } });
    return unit;
  }

  async history(id: string) {
    return this.prisma.auditLog.findMany({
      where: { entityType: 'Unit', entityId: id },
      orderBy: { createdAt: 'desc' },
    });
  }
}
