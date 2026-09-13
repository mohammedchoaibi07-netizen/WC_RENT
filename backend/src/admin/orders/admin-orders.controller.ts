import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { OrderStatus, AdminUser, Province } from '@prisma/client';
import { z } from 'zod';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { CurrentAdmin } from '../auth/current-admin.decorator';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { AdminOrdersService } from './admin-orders.service';

const ChangeStatusSchema = z.object({
  to: z.nativeEnum(OrderStatus),
  note: z.string().max(1000).optional(),
});

const AddNoteSchema = z.object({ note: z.string().min(1).max(1000) });
const RefundSchema = z.object({ amountEur: z.number().positive().optional() });

@ApiExcludeController()
@Controller('api/admin/orders')
@UseGuards(AdminSessionGuard)
export class AdminOrdersController {
  constructor(private readonly adminOrders: AdminOrdersService) {}

  @Get()
  async list(
    @Query('statut') statut?: OrderStatus,
    @Query('province') province?: Province,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.adminOrders.list({
      statut,
      province,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
    });
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    return this.adminOrders.detail(id);
  }

  @Patch(':id/status')
  async changeStatus(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(ChangeStatusSchema)) body: { to: OrderStatus; note?: string },
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.adminOrders.changeStatus(id, body.to, admin, body.note);
  }

  @Post(':id/notes')
  async addNote(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(AddNoteSchema)) body: { note: string },
    @CurrentAdmin() admin: AdminUser,
  ) {
    await this.adminOrders.addNote(id, admin, body.note);
    return { added: true };
  }

  @Post(':id/resend-confirmation')
  async resendConfirmation(@Param('id') id: string, @CurrentAdmin() admin: AdminUser) {
    return this.adminOrders.resendConfirmation(id, admin);
  }

  @Post(':id/refund')
  async refund(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(RefundSchema)) body: { amountEur?: number },
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.adminOrders.refund(id, admin, body.amountEur);
  }
}
