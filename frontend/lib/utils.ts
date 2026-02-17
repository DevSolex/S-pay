/**
 * Common utilities for S-pay frontend.
 */

export function shortenAddress(addr: string, start = 6, end = 4): string {
  if (!addr || addr.length <= start + end) return addr;
  return `${addr.slice(0, start)}…${addr.slice(-end)}`;
}

export function isValidPrincipal(addr: string): boolean {
  return /^S[PM2][0-9A-Z]{38}$/.test(addr);
}
// S-pay commit 23
// S-pay commit 24
