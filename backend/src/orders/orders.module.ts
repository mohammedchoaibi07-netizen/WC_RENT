import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AvailabilityService } from '../availability/availability.service';
import { ZonesController } from '../availability/zones.controller';
import { PricingModule } from '../pricing/pricing.module';
import { MollieModule } from '../payments/mollie.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [PricingModule, MollieModule, CustomersModule],
  controllers: [OrdersController, ZonesController],
  providers: [OrdersService, AvailabilityService],
  exports: [OrdersService, AvailabilityService],
})
export class OrdersModule {}
