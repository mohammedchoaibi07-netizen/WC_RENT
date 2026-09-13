/** Formatte une reference lisible de commande, ex: WCR-2026-0001. */
export function formatOrderReference(year: number, sequence: number): string {
  return `WCR-${year}-${String(sequence).padStart(4, '0')}`;
}
