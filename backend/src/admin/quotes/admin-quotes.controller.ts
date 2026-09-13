import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { QuoteStatus, AdminUser } from '@prisma/client';
import { z } from 'zod';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { CurrentAdmin } from '../auth/current-admin.decorator';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { AdminQuotesService } from './admin-quotes.service';

const SetStatusSchema = z.object({ statut: z.nativeEnum(QuoteStatus) });

@ApiExcludeController()
@Controller('api/admin/quotes')
@UseGuards(AdminSessionGuard)
export class AdminQuotesController {
  constructor(private readonly quotes: AdminQuotesService) {}

  @Get()
  async list(@Query('statut') statut?: QuoteStatus) {
    return this.quotes.list(statut);
  }

  @Patch(':id/status')
  async setStatus(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(SetStatusSchema)) body: { statut: QuoteStatus },
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.quotes.setStatus(id, body.statut, admin.id);
  }
}
