import { Module } from '@nestjs/common';
import { ViesService } from './vies.service';

@Module({
  providers: [ViesService],
  exports: [ViesService],
})
export class CustomersModule {}
