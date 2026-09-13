import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderStatus, ServiceVisitStatus } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { OrdersService } from '../orders/orders.service';
import { addDays, startOfDay } from '../availability/date.util';
import { deliveryReminderEmail } from '../email/templates/delivery-reminder';
import { removalReminderEmail } from '../email/templates/removal-reminder';
import { serviceVisitNoticeEmail } from '../email/templates/service-visit-notice';
import { UNPAID_ORDER_EXPIRY_HOURS } from '../orders/order-lifecycle.constants';

/** Empeche l'envoi du meme rappel plusieurs fois si le cron tourne deux fois le meme jour. */
async function alreadyNotified(prisma: PrismaService, action: string, entityId: string): Promise<boolean> {
  const existing = await prisma.auditLog.findFirst({ where: { action, entityId } });
  return Boolean(existing);
}

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
    private readonly orders: OrdersService,
  ) {}

  /** Rappel de livraison la veille + rappel d'enlevement + avis de passage, tous les jours a 8h. */
  @Cron('0 8 * * *', { timeZone: 'Europe/Brussels' })
  async sendDailyReminders() {
    const tomorrow = startOfDay(addDays(new Date(), 1));
    const dayAfterTomorrow = addDays(tomorrow, 1);

    const deliveries = await this.prisma.order.findMany({
      where: { status: OrderStatus.planifiee, dateDebut: { gte: tomorrow, lt: dayAfterTomorrow } },
      include: { customer: true },
    });
    for (const order of deliveries) {
      if (await alreadyNotified(this.prisma, 'email.delivery_reminder', order.id)) continue;
      const tpl = deliveryReminderEmail(order);
      await this.email.send({ to: order.customer.email, subject: tpl.subject, html: tpl.html });
      await this.prisma.auditLog.create({ data: { action: 'email.delivery_reminder', entityType: 'Order', entityId: order.id } });
    }

    const removals = await this.prisma.order.findMany({
      where: { status: { in: [OrderStatus.livree, OrderStatus.en_cours] }, dateFin: { gte: tomorrow, lt: dayAfterTomorrow } },
      include: { customer: true },
    });
    for (const order of removals) {
      if (await alreadyNotified(this.prisma, 'email.removal_reminder', order.id)) continue;
      const tpl = removalReminderEmail(order);
      await this.email.send({ to: order.customer.email, subject: tpl.subject, html: tpl.html });
      await this.prisma.auditLog.create({ data: { action: 'email.removal_reminder', entityType: 'Order', entityId: order.id } });
    }

    const visits = await this.prisma.serviceVisit.findMany({
      where: { statut: ServiceVisitStatus.prevu, datePlanifiee: { gte: tomorrow, lt: dayAfterTomorrow } },
      include: { order: { include: { customer: true } } },
    });
    for (const visit of visits) {
      if (await alreadyNotified(this.prisma, 'email.service_visit_notice', visit.id)) continue;
      const tpl = serviceVisitNoticeEmail(visit.order, visit);
      await this.email.send({ to: visit.order.customer.email, subject: tpl.subject, html: tpl.html });
      await this.prisma.auditLog.create({ data: { action: 'email.service_visit_notice', entityType: 'ServiceVisit', entityId: visit.id } });
    }

    this.logger.log(`Rappels envoyes: ${deliveries.length} livraisons, ${removals.length} enlevements, ${visits.length} entretiens.`);
  }

  /** Libere automatiquement les commandes non payees a temps (toutes les 10 minutes). */
  @Cron(CronExpression.EVERY_10_MINUTES)
  async expireUnpaidOrders() {
    const threshold = new Date(Date.now() - UNPAID_ORDER_EXPIRY_HOURS * 3_600_000);
    const stale = await this.prisma.order.findMany({
      where: { status: OrderStatus.en_attente_paiement, createdAt: { lt: threshold } },
    });
    for (const order of stale) {
      await this.orders.transitionStatus(order.id, OrderStatus.annulee, 'system', 'Paiement non regle dans le delai imparti — cabines liberees.');
    }
    if (stale.length > 0) {
      this.logger.log(`${stale.length} commande(s) non payee(s) liberee(s).`);
    }
  }
}
