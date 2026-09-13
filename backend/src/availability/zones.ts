import { Province } from '@prisma/client';

/**
 * Delai de livraison par province, tel qu'annonce sur le site public.
 * cf. backend-prompt.md > "Zones et delais".
 */
export const DELIVERY_DELAY_HOURS: Record<Province, 24 | 48> = {
  [Province.ANVERS]: 24,
  [Province.BRABANT_FLAMAND]: 24,
  [Province.BRABANT_WALLON]: 24,
  [Province.BRUXELLES]: 24,
  [Province.FLANDRE_ORIENTALE]: 24,
  [Province.LIEGE]: 24,
  [Province.NAMUR]: 24,
  [Province.FLANDRE_OCCIDENTALE]: 48,
  [Province.HAINAUT]: 48,
  [Province.LIMBOURG]: 48,
  [Province.LUXEMBOURG]: 48,
};

/**
 * Determine la province beige a partir d'un code postal a 4 chiffres.
 * Plages standard des codes postaux belges par province.
 * Retourne null si le code postal est hors Belgique ou invalide.
 */
export function provinceFromPostalCode(rawZip: string): Province | null {
  const zip = rawZip.trim();
  if (!/^\d{4}$/.test(zip)) return null;
  const n = Number(zip);

  if (n >= 1000 && n <= 1299) return Province.BRUXELLES;
  if (n >= 1300 && n <= 1499) return Province.BRABANT_WALLON;
  if (n >= 1500 && n <= 1999) return Province.BRABANT_FLAMAND;
  if (n >= 2000 && n <= 2999) return Province.ANVERS;
  if (n >= 3000 && n <= 3499) return Province.BRABANT_FLAMAND;
  if (n >= 3500 && n <= 3999) return Province.LIMBOURG;
  if (n >= 4000 && n <= 4999) return Province.LIEGE;
  if (n >= 5000 && n <= 5999) return Province.NAMUR;
  if (n >= 6000 && n <= 6599) return Province.HAINAUT;
  if (n >= 6600 && n <= 6999) return Province.LUXEMBOURG;
  if (n >= 7000 && n <= 7999) return Province.HAINAUT;
  if (n >= 8000 && n <= 8999) return Province.FLANDRE_OCCIDENTALE;
  if (n >= 9000 && n <= 9999) return Province.FLANDRE_ORIENTALE;

  return null;
}

export function deliveryDelayHours(province: Province): 24 | 48 {
  return DELIVERY_DELAY_HOURS[province];
}
