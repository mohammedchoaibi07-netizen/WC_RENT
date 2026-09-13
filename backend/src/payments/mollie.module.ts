import { Module } from '@nestjs/common';
import { MollieService } from './mollie.service';

@Module({
  providers: [MollieService],
  exports: [MollieService],
})
export class MollieModule {}
