import { Module } from '@nestjs/common';
import { ServiceVisitsService } from './service-visits.service';

@Module({
  providers: [ServiceVisitsService],
  exports: [ServiceVisitsService],
})
export class ServiceVisitsModule {}
