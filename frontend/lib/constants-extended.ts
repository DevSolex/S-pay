export const APP_CONSTANTS = {
  CONTRACT_VERSION: '1.0.0',
  MAX_USERNAME_LENGTH: 24,
  MAX_BUSINESS_NAME_LENGTH: 50,
  MIN_STAKE_AMOUNT: 1000000, // 1 STX in microSTX
  DEFAULT_FEE_PERCENTAGE: 250, // 2.5%
  PAYMENT_EXPIRY_BLOCKS: 144, // ~24 hours
} as const;

export const NETWORK_CONFIG = {
  MAINNET: {
    name: 'mainnet',
    chainId: 1,
    explorerUrl: 'https://explorer.hiro.so',
  },
  TESTNET: {
    name: 'testnet',
    chainId: 2147483648,
    explorerUrl: 'https://explorer.hiro.so',
  },
} as const;

export const TOKEN_DECIMALS = {
  STX: 6,
  USDC: 6,
  BTC: 8,
} as const;

export const MERCHANT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  SUSPENDED: 'suspended',
  REJECTED: 'rejected',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  EXPIRED: 'expired',
  REFUNDED: 'refunded',
} as const;

export const USER_ROLES = {
  USER: 'user',
  MERCHANT: 'merchant',
  ADMIN: 'admin',
} as const;

export const TRANSACTION_TYPES = {
  PAYMENT: 'payment',
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  REFUND: 'refund',
  FEE: 'fee',
} as const;
