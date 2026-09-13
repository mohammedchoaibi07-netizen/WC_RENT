import { Controller, Get, Query } from '@nestjs/common';
import { Province } from '@prisma/client';
import { DELIVERY_DELAY_HOURS, deliveryDelayHours, provinceFromPostalCode } from './zones';

@Controller('api/zones')
export class ZonesController {
  @Get()
  list() {
    return Object.values(Province).map((province) => ({
      province,
      deliveryDelayHours: DELIVERY_DELAY_HOURS[province],
    }));
  }

  @Get('lookup')
  lookup(@Query('zip') zip: string) {
    const province = provinceFromPostalCode(zip ?? '');
    if (!province) return { province: null, deliveryDelayHours: null };
    return { province, deliveryDelayHours: deliveryDelayHours(province) };
  }
}
