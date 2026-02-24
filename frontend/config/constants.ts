export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;

export const MERCHANT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  SUSPENDED: 'suspended',
} as const;

export const ERROR_CODES = {
  UNAUTHORIZED: 100,
  NOT_OWNER: 101,
  ALREADY_REGISTERED: 102,
  USER_NOT_FOUND: 103,
  MERCHANT_NOT_FOUND: 104,
  INVALID_AMOUNT: 105,
  INSUFFICIENT_FUNDS: 106,
  PAYMENT_EXPIRED: 107,
  ALREADY_PAID: 108,
  INVALID_STATUS: 109,
  CONTRACT_PAUSED: 110,
} as const;
