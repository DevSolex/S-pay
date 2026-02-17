/**
 * Format helpers for display.
 */

export function formatStx(microStx: bigint | number): string {
  const n = typeof microStx === "bigint" ? Number(microStx) : microStx;
  return (n / 1e6).toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString();
}
