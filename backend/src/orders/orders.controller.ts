import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { AvailabilityService } from '../availability/availability.service';
import { PricingService } from '../pricing/pricing.service';
import { ZodValidationPipe } from '../common/validation/zod-validation.pipe';
import { AvailabilityQuerySchema } from './dto/availability.dto';
import { QuotePreviewSchema } from './dto/quote-preview.dto';
import { CreateOrderSchema } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('public')
@Controller('api')
export class OrdersController {
  constructor(
    private readonly availability: AvailabilityService,
    private readonly pricing: PricingService,
    private readonly orders: OrdersService,
  ) {}

  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @Post('availability')
  async checkAvailability(@Body(new ZodValidationPipe(AvailabilityQuerySchema)) body: any) {
    return this.availability.checkAvailability(body);
  }

  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @Post('quote/preview')
  async previewQuote(@Body(new ZodValidationPipe(QuotePreviewSchema)) body: any) {
    const breakdown = await this.pricing.quote({
      nbCabines: body.units,
      nbSemaines: body.weeks,
      passagesParSemaine: body.visits,
      clientType: body.clientType,
    });
    return breakdown;
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('orders')
  async createOrder(@Body(new ZodValidationPipe(CreateOrderSchema)) body: any) {
    return this.orders.createOrder(body);
  }

  @Get('orders/:ref')
  async getOrder(@Param('ref') ref: string, @Query('token') token: string) {
    const order = await this.orders.findByReferenceAndToken(ref, token ?? '');
    return {
      reference: order.reference,
      status: order.status,
      dateDebut: order.dateDebut,
      dateFin: order.dateFin,
      nbCabines: order.nbCabines,
      adresseVille: order.adresseVille,
      montantTotal: order.montantTotal,
      moyenPaiement: order.moyenPaiement,
    };
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('orders/:ref/cancel')
  async cancelOrder(@Param('ref') ref: string, @Body('token') token: string) {
    return this.orders.cancelOrder(ref, token ?? '');
  }
}
