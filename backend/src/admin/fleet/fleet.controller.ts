import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { UnitState, AdminUser } from '@prisma/client';
import { z } from 'zod';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { CurrentAdmin } from '../auth/current-admin.decorator';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { FleetService } from './fleet.service';

const CreateUnitSchema = z.object({ code: z.string().min(1).max(50) });
const SetStateSchema = z.object({ etat: z.nativeEnum(UnitState), notes: z.string().max(1000).optional() });

@ApiExcludeController()
@Controller('api/admin/fleet')
@UseGuards(AdminSessionGuard)
export class FleetController {
  constructor(private readonly fleet: FleetService) {}

  @Get()
  async list() {
    return this.fleet.list();
  }

  @Post()
  async create(@Body(new ZodValidationPipe(CreateUnitSchema)) body: { code: string }, @CurrentAdmin() admin: AdminUser) {
    return this.fleet.create(body.code, admin.id);
  }

  @Patch(':id/state')
  async setState(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(SetStateSchema)) body: { etat: UnitState; notes?: string },
    @CurrentAdmin() admin: AdminUser,
  ) {
    return this.fleet.setState(id, body.etat, admin.id, body.notes);
  }

  @Get(':id/history')
  async history(@Param('id') id: string) {
    return this.fleet.history(id);
  }
}
