import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/admin-auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminOrdersModule } from './orders/admin-orders.module';
import { PlanningModule } from './planning/planning.module';
import { FleetModule } from './fleet/fleet.module';
import { AdminQuotesModule } from './quotes/admin-quotes.module';
import { AdminPricingModule } from './pricing/admin-pricing.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    AdminAuthModule,
    DashboardModule,
    AdminOrdersModule,
    PlanningModule,
    FleetModule,
    AdminQuotesModule,
    AdminPricingModule,
    ExportModule,
  ],
})
export class AdminModule {}
