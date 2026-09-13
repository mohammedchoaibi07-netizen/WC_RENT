import { Injectable, BadRequestException } from '@nestjs/common';
import { AdminUser, OrderStatus, Province } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { OrdersService } from '../../orders/orders.service';
import { MollieService } from '../../payments/mollie.service';
import { EmailService } from '../../email/email.service';
import { InvoicesService } from '../../invoices/invoices.service';
import { AuditLogService } from '../../common/audit/audit-log.service';
import { orderConfirmationEmail } from '../../email/templates/order-confirmation';

@Injectable()
export class AdminOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly mollie: MollieService,
    private readonly email: EmailService,
    private readonly invoices: InvoicesService,
    private readonly auditLog: AuditLogService,
  ) {}

  async list(filters: { statut?: OrderStatus; province?: Province; from?: Date; to?: Date }) {
    return this.prisma.order.findMany({
      where: {
        status: filters.statut,
        province: filters.province,
        dateDebut: filters.from || filters.to ? { gte: filters.from, lte: filters.to } : undefined,
      },
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }

  async detail(id: string) {
    return this.prisma.order.findUniqueOrThrow({
      where: { id },
      include: { customer: true, serviceVisits: true, invoice: true, statusEvents: { orderBy: { createdAt: 'desc' } }, orderUnits: { include: { unit: true } } },
    });
  }

  async changeStatus(id: string, to: OrderStatus, admin: AdminUser, note?: string) {
    const updated = await this.orders.transitionStatus(id, to, admin.id, note);
    await this.auditLog.record({ adminId: admin.id, action: 'order.status_changed', entityType: 'Order', entityId: id, details: { to, note } });
    return updated;
  }

  async addNote(id: string, admin: AdminUser, note: string) {
    const order = await this.prisma.order.findUniqueOrThrow({ where: { id } });
    await this.prisma.orderStatusEvent.create({
      data: { orderId: id, from: order.status, to: order.status, auteur: admin.id, note },
    });
    await this.auditLog.record({ adminId: admin.id, action: 'order.note_added', entityType: 'Order', entityId: id, details: { note } });
  }

  async resendConfirmation(id: string, admin: AdminUser) {
    const order = await this.prisma.order.findUniqueOrThrow({ where: { id }, include: { customer: true, invoice: true } });
    if (!order.invoice) throw new BadRequestException("Cette commande n'a pas encore de facture (paiement non confirme).");

    const token = await this.orders.issueTrackingToken(order.id, order.reference);
    const trackingUrl = `${process.env.PUBLIC_BASE_URL ?? 'http://localhost:3000'}/suivi?ref=${order.reference}&token=${token}`;
    const confirmation = orderConfirmationEmail(order, trackingUrl);
    await this.email.send({ to: order.customer.email, subject: confirmation.subject, html: confirmation.html });

    await this.auditLog.record({ adminId: admin.id, action: 'order.confirmation_resent', entityType: 'Order', entityId: id });
    return { sent: true };
  }

  async refund(id: string, admin: AdminUser, amountEur?: number) {
    const order = await this.prisma.order.findUniqueOrThrow({ where: { id } });
    if (!order.molliePaymentId) throw new BadRequestException('Aucun paiement Mollie associe a cette commande.');

    const amount = amountEur ?? Number(order.montantTotal);
    await this.mollie.refund(order.molliePaymentId, amount);
    const updated = await this.orders.transitionStatus(id, OrderStatus.remboursee, admin.id, `Remboursement manuel de ${amount.toFixed(2)} EUR`);

    await this.auditLog.record({ adminId: admin.id, action: 'order.refunded', entityType: 'Order', entityId: id, details: { amount } });
    return updated;
  }
}
