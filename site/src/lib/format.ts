export function formatEur(amount: number): string {
  return amount.toLocaleString("fr-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

export function formatDateFr(dateIso: string): string {
  const d = new Date(dateIso);
  return new Intl.DateTimeFormat("fr-BE", { day: "2-digit", month: "long", year: "numeric" }).format(d);
}
