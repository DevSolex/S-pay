const ERROR_CODES = {
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
};

const ERROR_MESSAGES = {
  [ERROR_CODES.UNAUTHORIZED]: 'Unauthorized access',
  [ERROR_CODES.NOT_OWNER]: 'Not contract owner',
  [ERROR_CODES.ALREADY_REGISTERED]: 'Already registered',
  [ERROR_CODES.USER_NOT_FOUND]: 'User not found',
  [ERROR_CODES.MERCHANT_NOT_FOUND]: 'Merchant not found',
  [ERROR_CODES.INVALID_AMOUNT]: 'Invalid amount',
  [ERROR_CODES.INSUFFICIENT_FUNDS]: 'Insufficient funds',
  [ERROR_CODES.PAYMENT_EXPIRED]: 'Payment expired',
  [ERROR_CODES.ALREADY_PAID]: 'Already paid',
  [ERROR_CODES.INVALID_STATUS]: 'Invalid status',
  [ERROR_CODES.CONTRACT_PAUSED]: 'Contract paused',
  [ERROR_CODES.INVALID_FEE]: 'Invalid fee',
  [ERROR_CODES.LIMIT_EXCEEDED]: 'Limit exceeded',
  [ERROR_CODES.INVALID_PRINCIPAL]: 'Invalid principal',
  [ERROR_CODES.SUBSCRIPTION_EXPIRED]: 'Subscription expired',
  [ERROR_CODES.PLAN_NOT_FOUND]: 'Plan not found',
};

function getErrorMessage(code) {
  return ERROR_MESSAGES[code] || 'Unknown error';
}

function isContractError(error) {
  return error && typeof error === 'object' && 'code' in error;
}

function parseContractError(error) {
  if (isContractError(error)) {
    return {
      code: error.code,
      message: getErrorMessage(error.code),
    };
  }
  return {
    code: -1,
    message: error.message || 'Unknown error',
  };
}

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
  getErrorMessage,
  isContractError,
  parseContractError,
};
