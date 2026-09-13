import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { ExportService } from './export.service';

@ApiExcludeController()
@Controller('api/admin/export')
@UseGuards(AdminSessionGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('orders.csv')
  async ordersCsv(@Res() res: FastifyReply) {
    const csv = await this.exportService.ordersCsv();
    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.header('Content-Disposition', 'attachment; filename="commandes.csv"');
    res.send(csv);
  }

  @Get('invoices.csv')
  async invoicesCsv(@Res() res: FastifyReply) {
    const csv = await this.exportService.invoicesCsv();
    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.header('Content-Disposition', 'attachment; filename="factures.csv"');
    res.send(csv);
  }
}
