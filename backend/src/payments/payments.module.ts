import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { MollieModule } from './mollie.module';
import { OrdersModule } from '../orders/orders.module';
import { EmailModule } from '../email/email.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { ServiceVisitsModule } from '../service-visits/service-visits.module';

/** Regroupe uniquement le webhook Mollie (cote reception des paiements). */
@Module({
  imports: [MollieModule, OrdersModule, EmailModule, InvoicesModule, ServiceVisitsModule],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class PaymentsModule {}
