import { Injectable, Logger } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PaymentStatus } from '@mollie/api-client';
import { PrismaService } from '../common/prisma/prisma.service';
import { OrdersService } from '../orders/orders.service';
import { EmailService } from '../email/email.service';
import { InvoicesService } from '../invoices/invoices.service';
import { ServiceVisitsService } from '../service-visits/service-visits.service';
import { orderConfirmationEmail } from '../email/templates/order-confirmation';
import { MollieService } from './mollie.service';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly mollie: MollieService,
    private readonly email: EmailService,
    private readonly invoices: InvoicesService,
    private readonly serviceVisits: ServiceVisitsService,
  ) {}

  /**
   * Traite une notification Mollie. Idempotent : peut etre appele plusieurs
   * fois avec le meme id de paiement sans effet de bord au-dela du premier
   * traitement reussi.
   */
  async handleMolliePaymentNotification(paymentId: string): Promise<void> {
    const order = await this.prisma.order.findFirst({ where: { molliePaymentId: paymentId } });
    if (!order) {
      this.logger.warn(`Webhook Mollie recu pour un paiement inconnu: ${paymentId}`);
      return;
    }

    // On ne fait jamais confiance au payload du webhook : on revalide
    // l'etat aupres de l'API Mollie avec notre cle secrete.
    const payment = await this.mollie.fetchAuthoritativePayment(paymentId);
    if (!payment) return;

    if (order.status !== OrderStatus.en_attente_paiement) {
      this.logger.log(`Commande ${order.reference} deja traitee (statut=${order.status}) — notification ignoree.`);
      return;
    }

    if (payment.status === PaymentStatus.paid) {
      const paidOrder = await this.orders.transitionStatus(order.id, OrderStatus.payee, 'system');
      await this.serviceVisits.generateForOrder(paidOrder);

      const customer = await this.prisma.customer.findUniqueOrThrow({ where: { id: paidOrder.customerId } });
      const token = await this.orders.issueTrackingToken(paidOrder.id, paidOrder.reference);
      const trackingUrl = `${process.env.PUBLIC_BASE_URL ?? 'http://localhost:3000'}/suivi?ref=${paidOrder.reference}&token=${token}`;

      const { pdfBuffer, numero } = await this.invoices.generateForOrder(paidOrder);

      const confirmation = orderConfirmationEmail(paidOrder, trackingUrl);
      await this.email.send({
        to: customer.email,
        subject: confirmation.subject,
        html: confirmation.html,
        attachments: [{ filename: `facture-${numero}.pdf`, content: pdfBuffer }],
      });

      await this.orders.transitionStatus(paidOrder.id, OrderStatus.planifiee, 'system', 'Livraison planifiee');

      this.logger.log(`Paiement confirme pour ${paidOrder.reference} — facture ${numero} generee.`);
      return;
    }

    if (payment.status === PaymentStatus.expired || payment.status === PaymentStatus.canceled || payment.status === PaymentStatus.failed) {
      await this.orders.transitionStatus(order.id, OrderStatus.annulee, 'system', `Paiement ${payment.status}`);
    }
  }
}
