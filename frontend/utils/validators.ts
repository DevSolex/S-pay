export function validateAddress(address: string): boolean {
  return /^S[PM][0-9A-Z]{38,40}$/.test(address);
}

export function validateAmount(amount: string | number): boolean {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && num > 0;
}

export function validateUsername(username: string): boolean {
  return username.length >= 3 && username.length <= 64 && /^[a-zA-Z0-9_-]+$/.test(username);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateBusinessName(name: string): boolean {
  return name.length >= 2 && name.length <= 64;
}
