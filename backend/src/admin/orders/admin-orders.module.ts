import { Module } from '@nestjs/common';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminOrdersService } from './admin-orders.service';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { OrdersModule } from '../../orders/orders.module';
import { MollieModule } from '../../payments/mollie.module';
import { InvoicesModule } from '../../invoices/invoices.module';

@Module({
  imports: [AdminAuthModule, OrdersModule, MollieModule, InvoicesModule],
  controllers: [AdminOrdersController],
  providers: [AdminOrdersService],
})
export class AdminOrdersModule {}
