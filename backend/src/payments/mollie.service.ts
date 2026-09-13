import { Injectable, Logger } from '@nestjs/common';
import createMollieClient, { MollieClient, PaymentMethod as MolliePaymentMethod } from '@mollie/api-client';
import { PaymentMethod } from '@prisma/client';

const METHOD_MAP: Record<PaymentMethod, MolliePaymentMethod> = {
  bancontact: 'bancontact' as MolliePaymentMethod,
  carte: 'creditcard' as MolliePaymentMethod,
  virement: 'banktransfer' as MolliePaymentMethod,
};

@Injectable()
export class MollieService {
  private readonly logger = new Logger(MollieService.name);
  private readonly client: MollieClient;

  constructor() {
    // TODO A CONFIRMER: brancher le vrai compte Mollie (MOLLIE_API_KEY en
    // mode "live_") avant mise en production. En sandbox, une cle "test_"
    // suffit pour simuler des paiements sans reel encaissement.
    this.client = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY ?? 'test_placeholder' });
  }

  async createPayment(params: {
    orderReference: string;
    amountEur: number;
    description: string;
    method: PaymentMethod;
    redirectUrl: string;
  }) {
    const payment = await this.client.payments.create({
      amount: { currency: 'EUR', value: params.amountEur.toFixed(2) },
      description: params.description,
      method: METHOD_MAP[params.method],
      redirectUrl: params.redirectUrl,
      webhookUrl: process.env.MOLLIE_WEBHOOK_URL,
      metadata: { orderReference: params.orderReference },
    });
    return payment;
  }

  /**
   * Mollie n'envoie pas de signature sur ses webhooks : le corps du POST
   * contient seulement un id de paiement. La verification consiste donc a
   * re-interroger l'API Mollie avec notre cle secrete pour obtenir l'etat
   * authentique du paiement, plutot que de faire confiance au payload recu.
   */
  async fetchAuthoritativePayment(paymentId: string) {
    try {
      return await this.client.payments.get(paymentId);
    } catch (error) {
      this.logger.error(`Paiement Mollie introuvable pour id=${paymentId}: ${error}`);
      return null;
    }
  }

  async refund(paymentId: string, amountEur: number) {
    return this.client.paymentRefunds.create({
      paymentId,
      amount: { currency: 'EUR', value: amountEur.toFixed(2) },
    });
  }
}
