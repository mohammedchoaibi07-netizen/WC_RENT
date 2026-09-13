import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { DashboardService } from './dashboard.service';

@ApiExcludeController()
@Controller('api/admin/dashboard')
@UseGuards(AdminSessionGuard)
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get()
  async get() {
    return this.dashboard.getSummary();
  }
}
