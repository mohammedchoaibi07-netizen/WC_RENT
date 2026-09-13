import { z } from 'zod';

export const QuotePreviewSchema = z.object({
  units: z.number().int().min(1).max(50),
  weeks: z.number().int().min(1).max(52),
  visits: z.number().int().min(0).max(7),
  zip: z.string().regex(/^\d{4}$/, 'Code postal belge attendu (4 chiffres)'),
  clientType: z.enum(['particulier', 'societe']),
});

export type QuotePreviewDto = z.infer<typeof QuotePreviewSchema>;
