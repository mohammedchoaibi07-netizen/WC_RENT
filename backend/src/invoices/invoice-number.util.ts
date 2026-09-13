/** Numero de facture legal, sequentiel et sans trou par annee : 2026-000123. */
export function formatInvoiceNumber(year: number, sequence: number): string {
  return `${year}-${String(sequence).padStart(6, '0')}`;
}
