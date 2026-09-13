import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AdminRole, AdminUser } from '@prisma/client';
import { z } from 'zod';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentAdmin } from '../auth/current-admin.decorator';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { AdminPricingService } from './admin-pricing.service';

const CreatePriceListSchema = z.object({
  validFrom: z.coerce.date(),
  prixSemaineCabine: z.number().positive(),
  prixPassageEntretien: z.number().nonnegative(),
  prixLivraisonForfait: z.number().nonnegative(),
  remiseSocietePct: z.number().min(0).max(1),
  tvaPct: z.number().min(0).max(1),
});

@ApiExcludeController()
@Controller('api/admin/pricing')
@UseGuards(AdminSessionGuard)
export class AdminPricingController {
  constructor(private readonly pricing: AdminPricingService) {}

  @Get()
  async list() {
    return this.pricing.list();
  }

  @Roles(AdminRole.admin)
  @Post()
  async create(
    @Body(new ZodValidationPipe(CreatePriceListSchema)) body: z.infer<typeof CreatePriceListSchema>,
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.pricing.create(body, admin.id);
  }
}
