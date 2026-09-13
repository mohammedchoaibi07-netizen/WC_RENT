import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RemindersService } from './reminders.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [ScheduleModule.forRoot(), OrdersModule],
  providers: [RemindersService],
})
export class SchedulingModule {}
