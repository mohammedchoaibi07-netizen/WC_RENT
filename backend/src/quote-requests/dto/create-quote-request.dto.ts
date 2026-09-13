import { z } from 'zod';

export const CreateQuoteRequestSchema = z.object({
  nom: z.string().min(2).max(200),
  telephone: z.string().min(6).max(30),
  email: z.string().email(),
  codePostal: z.string().regex(/^\d{4}$/, 'Code postal belge attendu (4 chiffres)'),
  typeBesoin: z.enum(['chantier', 'evenement', 'industrie', 'particulier']),
  details: z.string().max(2000).optional(),
  honeypot: z.string().max(0).optional().default(''),
  hcaptchaToken: z.string().min(1),
});

export type CreateQuoteRequestDto = z.infer<typeof CreateQuoteRequestSchema>;
