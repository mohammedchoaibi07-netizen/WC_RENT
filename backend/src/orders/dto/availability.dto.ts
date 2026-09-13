import { z } from 'zod';

export const AvailabilityQuerySchema = z.object({
  zip: z.string().regex(/^\d{4}$/, 'Code postal belge attendu (4 chiffres)'),
  start: z.coerce.date(),
  weeks: z.coerce.number().int().min(1).max(52),
  units: z.coerce.number().int().min(1).max(50),
});

export type AvailabilityQueryDto = z.infer<typeof AvailabilityQuerySchema>;
