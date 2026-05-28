const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export function formatPrice(cents: number): string {
  return formatter.format(cents / 100);
}

export function formatPriceRaw(euros: number): string {
  return formatter.format(euros);
}
