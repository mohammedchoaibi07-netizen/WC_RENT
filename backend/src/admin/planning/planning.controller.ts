import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AdminUser } from '@prisma/client';
import { z } from 'zod';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { CurrentAdmin } from '../auth/current-admin.decorator';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { PlanningService } from './planning.service';

const AssignSchema = z.object({ technicien: z.string().min(1).max(120) });
const MarkDoneSchema = z.object({ note: z.string().max(1000).optional(), photoUrl: z.string().url().optional() });

@ApiExcludeController()
@Controller('api/admin/planning')
@UseGuards(AdminSessionGuard)
export class PlanningController {
  constructor(private readonly planning: PlanningService) {}

  @Get('week')
  async week(@Query('from') from: string, @Query('to') to: string) {
    return this.planning.week(new Date(from), new Date(to));
  }

  @Patch('visits/:id/assign')
  async assign(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(AssignSchema)) body: { technicien: string },
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.planning.assignTechnician(id, body.technicien, admin.id);
  }

  @Patch('visits/:id/done')
  async markDone(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(MarkDoneSchema)) body: { note?: string; photoUrl?: string },
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.planning.markVisitDone(id, admin.id, body.note, body.photoUrl);
  }
}
