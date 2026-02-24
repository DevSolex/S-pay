export function validateUsername(username: string): boolean {
  return username.length > 0 && username.length <= 24;
}

export function validateBusinessName(name: string): boolean {
  return name.length > 0 && name.length <= 64;
}

export function validateWebsite(url: string): boolean {
  try {
    new URL(url);
    return url.length <= 128;
  } catch {
    return false;
  }
}

export function validateAmount(amount: number): boolean {
  return amount > 0 && Number.isInteger(amount);
}
