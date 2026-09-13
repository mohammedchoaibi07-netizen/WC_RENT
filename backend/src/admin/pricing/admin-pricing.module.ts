import { Module } from '@nestjs/common';
import { AdminPricingController } from './admin-pricing.controller';
import { AdminPricingService } from './admin-pricing.service';
import { AdminAuthModule } from '../auth/admin-auth.module';

@Module({
  imports: [AdminAuthModule],
  controllers: [AdminPricingController],
  providers: [AdminPricingService],
})
export class AdminPricingModule {}
