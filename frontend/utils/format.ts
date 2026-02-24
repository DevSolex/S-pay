export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(amount: string | number): string {
  const num = typeof amount === 'string' ? parseInt(amount) : amount;
  return (num / 1_000_000).toFixed(2);
}
