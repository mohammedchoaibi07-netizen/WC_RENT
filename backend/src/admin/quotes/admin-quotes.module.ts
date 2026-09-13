import { Module } from '@nestjs/common';
import { AdminQuotesController } from './admin-quotes.controller';
import { AdminQuotesService } from './admin-quotes.service';
import { AdminAuthModule } from '../auth/admin-auth.module';

@Module({
  imports: [AdminAuthModule],
  controllers: [AdminQuotesController],
  providers: [AdminQuotesService],
})
export class AdminQuotesModule {}
