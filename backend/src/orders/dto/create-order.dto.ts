import { z } from 'zod';

const ParticulierCustomerSchema = z.object({
  type: z.literal('particulier'),
  nom: z.string().min(2).max(200),
  email: z.string().email(),
  telephone: z.string().min(6).max(30),
});

const SocieteCustomerSchema = z.object({
  type: z.literal('societe'),
  nom: z.string().min(2).max(200),
  email: z.string().email(),
  telephone: z.string().min(6).max(30),
  societeNom: z.string().min(2).max(200),
  tvaNumero: z.string().min(9).max(20),
});

export const CustomerSchema = z.discriminatedUnion('type', [
  ParticulierCustomerSchema,
  SocieteCustomerSchema,
]);

export const CreateOrderSchema = z
  .object({
    customer: CustomerSchema,
    nbCabines: z.number().int().min(1).max(50),
    nbSemaines: z.number().int().min(1).max(52),
    passagesParSemaine: z.number().int().min(0).max(7),
    dateDebut: z.coerce.date(),
    adresseRue: z.string().min(3).max(200),
    adresseCp: z.string().regex(/^\d{4}$/, 'Code postal belge attendu (4 chiffres)'),
    adresseVille: z.string().min(2).max(120),
    moyenPaiement: z.enum(['bancontact', 'carte', 'virement']),
    montantTotalAttendu: z.number().positive(),
    cgvVersion: z.string().min(1),
    // Anti-spam : champ cache, doit rester vide.
    honeypot: z.string().max(0).optional().default(''),
    hcaptchaToken: z.string().min(1),
  })
  .refine((data) => data.nbSemaines > 1 || data.passagesParSemaine <= 1, {
    message: "Pour une location d'une seule semaine, l'entretien est limite a 0 ou 1 passage.",
    path: ['passagesParSemaine'],
  });

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
