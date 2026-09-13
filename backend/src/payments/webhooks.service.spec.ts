import { describe, expect, it, vi } from 'vitest';
import { OrderStatus } from '@prisma/client';
import { PaymentStatus } from '@mollie/api-client';
import { WebhooksService } from './webhooks.service';

function buildDeps(initialStatus: OrderStatus) {
  const order = {
    id: 'order-1',
    reference: 'WCR-2026-0001',
    customerId: 'cust-1',
    status: initialStatus,
    molliePaymentId: 'tr_123',
    dateDebut: new Date('2026-11-01'),
    dateFin: new Date('2026-11-14'),
    passagesParSemaine: 1,
    montantTotal: 175.45,
  } as any;

  const prisma = {
    order: { findFirst: vi.fn().mockResolvedValue(order) },
    customer: { findUniqueOrThrow: vi.fn().mockResolvedValue({ id: 'cust-1', email: 'client@example.com' }) },
  } as any;

  const transitionStatus = vi.fn().mockImplementation((_id, to) => {
    order.status = to;
    return Promise.resolve(order);
  });
  const orders = {
    transitionStatus,
    issueTrackingToken: vi.fn().mockResolvedValue('plain-token'),
  } as any;

  const mollie = {
    fetchAuthoritativePayment: vi.fn().mockResolvedValue({ status: PaymentStatus.paid }),
  } as any;

  const email = { send: vi.fn().mockResolvedValue(undefined) } as any;
  const invoices = { generateForOrder: vi.fn().mockResolvedValue({ numero: '2026-000001', pdfBuffer: Buffer.from('x') }) } as any;
  const serviceVisits = { generateForOrder: vi.fn().mockResolvedValue([]) } as any;

  return { order, prisma, orders, mollie, email, invoices, serviceVisits };
}

describe('WebhooksService.handleMolliePaymentNotification', () => {
  it('confirme la commande, genere la facture et envoie la confirmation la premiere fois', async () => {
    const deps = buildDeps(OrderStatus.en_attente_paiement);
    const service = new WebhooksService(deps.prisma, deps.orders, deps.mollie, deps.email, deps.invoices, deps.serviceVisits);

    await service.handleMolliePaymentNotification('tr_123');

    expect(deps.orders.transitionStatus).toHaveBeenCalledWith(deps.order.id, OrderStatus.payee, 'system');
    expect(deps.invoices.generateForOrder).toHaveBeenCalledTimes(1);
    expect(deps.email.send).toHaveBeenCalledTimes(1);
    expect(deps.serviceVisits.generateForOrder).toHaveBeenCalledTimes(1);
  });

  it('est idempotent : une seconde notification pour une commande deja payee ne refait rien', async () => {
    const deps = buildDeps(OrderStatus.payee);
    const service = new WebhooksService(deps.prisma, deps.orders, deps.mollie, deps.email, deps.invoices, deps.serviceVisits);

    await service.handleMolliePaymentNotification('tr_123');

    expect(deps.orders.transitionStatus).not.toHaveBeenCalled();
    expect(deps.invoices.generateForOrder).not.toHaveBeenCalled();
    expect(deps.email.send).not.toHaveBeenCalled();
  });

  it('ignore silencieusement un id de paiement inconnu', async () => {
    const deps = buildDeps(OrderStatus.en_attente_paiement);
    deps.prisma.order.findFirst.mockResolvedValueOnce(null);
    const service = new WebhooksService(deps.prisma, deps.orders, deps.mollie, deps.email, deps.invoices, deps.serviceVisits);

    await expect(service.handleMolliePaymentNotification('tr_unknown')).resolves.toBeUndefined();
    expect(deps.orders.transitionStatus).not.toHaveBeenCalled();
  });
});
