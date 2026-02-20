export class SPPayError extends Error {
  constructor(public code: number, message: string) {
    super(message);
    this.name = 'SPPayError';
  }
}

export const ErrorCodes = {
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
  INVALID_FEE: 111,
  LIMIT_EXCEEDED: 112,
  INVALID_PRINCIPAL: 113,
  SUBSCRIPTION_EXPIRED: 114,
  PLAN_NOT_FOUND: 115,
} as const;

export const ErrorMessages: Record<number, string> = {
  [ErrorCodes.UNAUTHORIZED]: 'Unauthorized access',
  [ErrorCodes.NOT_OWNER]: 'Not contract owner',
  [ErrorCodes.ALREADY_REGISTERED]: 'Already registered',
  [ErrorCodes.USER_NOT_FOUND]: 'User not found',
  [ErrorCodes.MERCHANT_NOT_FOUND]: 'Merchant not found',
  [ErrorCodes.INVALID_AMOUNT]: 'Invalid amount',
  [ErrorCodes.INSUFFICIENT_FUNDS]: 'Insufficient funds',
  [ErrorCodes.PAYMENT_EXPIRED]: 'Payment expired',
  [ErrorCodes.ALREADY_PAID]: 'Already paid',
  [ErrorCodes.INVALID_STATUS]: 'Invalid status',
  [ErrorCodes.CONTRACT_PAUSED]: 'Contract paused',
  [ErrorCodes.INVALID_FEE]: 'Invalid fee',
  [ErrorCodes.LIMIT_EXCEEDED]: 'Limit exceeded',
  [ErrorCodes.INVALID_PRINCIPAL]: 'Invalid principal',
  [ErrorCodes.SUBSCRIPTION_EXPIRED]: 'Subscription expired',
  [ErrorCodes.PLAN_NOT_FOUND]: 'Plan not found',
};

export function handleContractError(errorCode: number): SPPayError {
  const message = ErrorMessages[errorCode] || 'Unknown error';
  return new SPPayError(errorCode, message);
}
