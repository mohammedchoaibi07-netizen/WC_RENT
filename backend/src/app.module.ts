import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuditLogModule } from './common/audit/audit-log.module';
import { SequenceModule } from './common/sequence/sequence.module';
import { SecurityModule } from './common/security/security.module';
import { EmailModule } from './email/email.module';
import { OrdersModule } from './orders/orders.module';
import { QuoteRequestsModule } from './quote-requests/quote-requests.module';
import { PaymentsModule } from './payments/payments.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ServiceVisitsModule } from './service-visits/service-visits.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    PrismaModule,
    AuditLogModule,
    SequenceModule,
    SecurityModule,
    EmailModule,
    InvoicesModule,
    ServiceVisitsModule,
    OrdersModule,
    QuoteRequestsModule,
    PaymentsModule,
    SchedulingModule,
    AdminModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
