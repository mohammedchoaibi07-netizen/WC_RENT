/** Normalise un numero de TVA belge en "BE0123456789" (sans espaces ni points). */
export function normalizeBelgianVat(raw: string): string {
  return raw.toUpperCase().replace(/[\s.]/g, '');
}

/** Valide le format d'un numero de TVA belge : BE + 10 chiffres, le premier etant 0 ou 1. */
export function isValidBelgianVatFormat(raw: string): boolean {
  const normalized = normalizeBelgianVat(raw);
  return /^BE[01]\d{9}$/.test(normalized);
}
