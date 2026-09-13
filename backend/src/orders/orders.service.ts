import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CustomerType, Order, OrderStatus, PaymentMethod, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { SequenceService } from '../common/sequence/sequence.service';
import { HCaptchaService } from '../common/security/hcaptcha.service';
import { AuditLogService } from '../common/audit/audit-log.service';
import { AvailabilityService } from '../availability/availability.service';
import { addDays, addWeeks } from '../availability/date.util';
import { provinceFromPostalCode } from '../availability/zones';
import { PricingService } from '../pricing/pricing.service';
import { AmountMismatchError, InvalidVisitFrequencyError } from '../pricing/pricing.errors';
import { MollieService } from '../payments/mollie.service';
import { EmailService } from '../email/email.service';
import { internalNewOrderEmail } from '../email/templates/internal-notification';
import { ViesService } from '../customers/vies.service';
import { isValidBelgianVatFormat } from '../customers/belgian-vat.util';
import { CreateOrderDto } from './dto/create-order.dto';
import { formatOrderReference } from './order-reference.util';
import { generateTrackingToken, hashTrackingToken, verifyTrackingToken } from './tracking-token.util';
import {
  CancellationNotAllowedError,
  CaptchaFailedError,
  InsufficientFleetError,
  InvalidTrackingTokenError,
  OrderNotFoundError,
  OutOfBelgiumError,
  InvalidVatError,
  PaymentInitializationError,
} from './orders.errors';
import {
  FREE_CANCELLATION_HOURS_BEFORE_DELIVERY,
  LATE_CANCELLATION_RETENTION_PCT,
} from './order-lifecycle.constants';

const CGV_VERSION = '2026-09-05';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sequence: SequenceService,
    private readonly hcaptcha: HCaptchaService,
    private readonly availability: AvailabilityService,
    private readonly pricing: PricingService,
    private readonly mollie: MollieService,
    private readonly vies: ViesService,
    private readonly auditLog: AuditLogService,
    private readonly email: EmailService,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<{ reference: string; checkoutUrl: string }> {
    if (dto.honeypot) {
      // Bot detecte silencieusement : on repond comme si tout allait bien.
      throw new OrderNotFoundError();
    }
    const captchaOk = await this.hcaptcha.verify(dto.hcaptchaToken);
    if (!captchaOk) {
      throw new CaptchaFailedError();
    }

    const province = provinceFromPostalCode(dto.adresseCp);
    if (!province) throw new OutOfBelgiumError();

    if (dto.customer.type === 'societe') {
      if (!isValidBelgianVatFormat(dto.customer.tvaNumero)) {
        throw new InvalidVatError();
      }
    }

    const dateDebut = dto.dateDebut;
    const dateFin = addDays(addWeeks(dateDebut, dto.nbSemaines), -1);

    const availabilityResult = await this.availability.checkAvailability({
      zip: dto.adresseCp,
      start: dateDebut,
      weeks: dto.nbSemaines,
      units: dto.nbCabines,
    });
    if (!availabilityResult.available) {
      throw new InsufficientFleetError(availabilityResult.firstFreeDate);
    }

    let pricing;
    try {
      pricing = await this.pricing.verifyClientAmount(
        {
          nbCabines: dto.nbCabines,
          nbSemaines: dto.nbSemaines,
          passagesParSemaine: dto.passagesParSemaine,
          clientType: dto.customer.type as CustomerType,
        },
        dto.montantTotalAttendu,
      );
    } catch (error) {
      if (error instanceof AmountMismatchError || error instanceof InvalidVisitFrequencyError) throw error;
      throw error;
    }

    const tvaValide = dto.customer.type === 'societe' ? await this.vies.isValid(dto.customer.tvaNumero) : null;

    const customer = await this.prisma.customer.upsert({
      where: { email: dto.customer.email },
      create: {
        type: dto.customer.type as CustomerType,
        nom: dto.customer.nom,
        email: dto.customer.email,
        telephone: dto.customer.telephone,
        societeNom: dto.customer.type === 'societe' ? dto.customer.societeNom : null,
        tvaNumero: dto.customer.type === 'societe' ? dto.customer.tvaNumero : null,
        tvaValide,
        adresseRue: dto.adresseRue,
        adresseCp: dto.adresseCp,
        adresseVille: dto.adresseVille,
      },
      update: {
        type: dto.customer.type as CustomerType,
        nom: dto.customer.nom,
        telephone: dto.customer.telephone,
        societeNom: dto.customer.type === 'societe' ? dto.customer.societeNom : null,
        tvaNumero: dto.customer.type === 'societe' ? dto.customer.tvaNumero : null,
        tvaValide,
      },
    });

    const year = dateDebut.getUTCFullYear();
    const sequenceNumber = await this.sequence.next(`order:${year}`);
    const reference = formatOrderReference(year, sequenceNumber);
    // Aucun jeton de suivi n'est utilisable avant confirmation du paiement :
    // on stocke un hash inatteignable en attendant qu'un vrai jeton soit
    // emis et envoye par e-mail des que le paiement est confirme (webhook).
    const placeholderHash = hashTrackingToken(randomUUID());
    const priceListId = pricing.priceListId;

    const order = await this.prisma.order.create({
      data: {
        reference,
        customerId: customer.id,
        status: OrderStatus.brouillon,
        dateDebut,
        dateFin,
        nbCabines: dto.nbCabines,
        passagesParSemaine: dto.passagesParSemaine,
        adresseRue: dto.adresseRue,
        adresseCp: dto.adresseCp,
        adresseVille: dto.adresseVille,
        province,
        clientType: dto.customer.type as CustomerType,
        societeRemiseAppliquee: pricing.remiseSocieteAppliquee,
        montantLocation: pricing.montantLocation,
        montantRemise: pricing.montantRemise,
        montantEntretien: pricing.montantEntretien,
        montantLivraison: pricing.montantLivraison,
        montantHtva: pricing.montantHtva,
        montantTva: pricing.montantTva,
        montantTotal: pricing.montantTotal,
        priceListId,
        moyenPaiement: dto.moyenPaiement as PaymentMethod,
        trackingTokenHash: placeholderHash,
        cgvVersion: CGV_VERSION,
        cgvAccepteesLe: new Date(),
        statusEvents: { create: { to: OrderStatus.brouillon, auteur: 'client' } },
      },
    });

    try {
      await this.availability.assignUnits(order.id, dateDebut, dateFin, dto.nbCabines);
    } catch (error) {
      await this.prisma.order.delete({ where: { id: order.id } });
      throw new InsufficientFleetError(null);
    }

    let payment;
    try {
      payment = await this.mollie.createPayment({
        orderReference: reference,
        amountEur: pricing.montantTotal,
        description: `WC Rent Belgium — ${reference}`,
        method: dto.moyenPaiement as PaymentMethod,
        redirectUrl: `${process.env.PUBLIC_BASE_URL ?? 'http://localhost:3000'}/reservation/confirmation?ref=${reference}`,
      });
    } catch (error) {
      this.logger.error(`Echec de creation du paiement Mollie pour ${reference}: ${error}`);
      await this.prisma.order.delete({ where: { id: order.id } });
      throw new PaymentInitializationError();
    }

    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.en_attente_paiement,
        molliePaymentId: payment.id,
        statusEvents: {
          create: { from: OrderStatus.brouillon, to: OrderStatus.en_attente_paiement, auteur: 'system' },
        },
      },
    });

    await this.auditLog.record({
      action: 'order.created',
      entityType: 'Order',
      entityId: order.id,
      details: { reference, montantTotal: pricing.montantTotal },
    });

    const internal = internalNewOrderEmail({ ...order, montantTotal: pricing.montantTotal } as any);
    await this.email.sendInternalNotification(internal.subject, internal.html);

    return { reference, checkoutUrl: payment.getCheckoutUrl() ?? '' };
  }

  /**
   * Emet un nouveau jeton de suivi en clair pour la commande et persiste
   * son hash. Appele uniquement au moment ou le jeton est effectivement
   * transmis au client (e-mail de confirmation de paiement) : le jeton
   * en clair ne doit jamais etre stocke.
   */
  async issueTrackingToken(orderId: string, reference: string): Promise<string> {
    const { token, hash } = generateTrackingToken(reference);
    await this.prisma.order.update({ where: { id: orderId }, data: { trackingTokenHash: hash } });
    return token;
  }

  async findByReferenceAndToken(reference: string, token: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({ where: { reference } });
    if (!order) throw new OrderNotFoundError();
    if (hashTrackingToken(token) !== order.trackingTokenHash || !verifyTrackingToken(reference, token)) {
      throw new InvalidTrackingTokenError();
    }
    return order;
  }

  async cancelOrder(reference: string, token: string): Promise<{ status: OrderStatus; retenuePct: number }> {
    const order = await this.findByReferenceAndToken(reference, token);

    const nonCancellableStatuses: OrderStatus[] = [OrderStatus.annulee, OrderStatus.remboursee, OrderStatus.cloturee];
    if (nonCancellableStatuses.includes(order.status)) {
      throw new CancellationNotAllowedError('Cette commande ne peut plus etre annulee.');
    }

    const hoursBeforeDelivery = (order.dateDebut.getTime() - Date.now()) / 3_600_000;
    const retenuePct = hoursBeforeDelivery >= FREE_CANCELLATION_HOURS_BEFORE_DELIVERY ? 0 : LATE_CANCELLATION_RETENTION_PCT;

    if (order.molliePaymentId && order.status !== OrderStatus.en_attente_paiement) {
      const remboursement = Number(order.montantTotal) * (1 - retenuePct);
      if (remboursement > 0) {
        await this.mollie.refund(order.molliePaymentId, remboursement);
      }
    }

    const newStatus = retenuePct > 0 ? OrderStatus.remboursee : OrderStatus.annulee;

    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        status: newStatus,
        statusEvents: { create: { from: order.status, to: newStatus, auteur: 'client' } },
      },
    });

    await this.auditLog.record({
      action: 'order.cancelled',
      entityType: 'Order',
      entityId: order.id,
      details: { retenuePct },
    });

    return { status: newStatus, retenuePct };
  }

  async findById(orderId: string) {
    return this.prisma.order.findUniqueOrThrow({ where: { id: orderId } });
  }

  async transitionStatus(
    orderId: string,
    to: OrderStatus,
    auteur: string,
    note?: string,
    extra?: Prisma.OrderUpdateInput,
  ) {
    const order = await this.prisma.order.findUniqueOrThrow({ where: { id: orderId } });
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        ...extra,
        status: to,
        statusEvents: { create: { from: order.status, to, auteur, note } },
      },
    });
  }
}
