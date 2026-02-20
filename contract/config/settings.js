const CONTRACT_CONFIG = {
  VERSION: '1.0.0',
  DEFAULT_FEE_PERCENTAGE: 250, // 2.5%
  MIN_STAKE_AMOUNT: 1000000, // 1 STX
  PAYMENT_EXPIRY_BLOCKS: 144, // ~24 hours
  MAX_USERNAME_LENGTH: 24,
  MAX_BUSINESS_NAME_LENGTH: 50,
};

const NETWORK_CONFIGS = {
  mainnet: {
    name: 'mainnet',
    chainId: 1,
    explorerUrl: 'https://explorer.hiro.so',
    apiUrl: 'https://api.mainnet.hiro.so',
  },
  testnet: {
    name: 'testnet',
    chainId: 2147483648,
    explorerUrl: 'https://explorer.hiro.so',
    apiUrl: 'https://api.testnet.hiro.so',
  },
  devnet: {
    name: 'devnet',
    chainId: 2147483648,
    explorerUrl: 'http://localhost:8000',
    apiUrl: 'http://localhost:3999',
  },
};

const MERCHANT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  SUSPENDED: 'suspended',
  REJECTED: 'rejected',
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  EXPIRED: 'expired',
  REFUNDED: 'refunded',
};

const GAS_LIMITS = {
  REGISTER_USER: 5000,
  REGISTER_MERCHANT: 10000,
  PROCESS_PAYMENT: 15000,
  WITHDRAW: 8000,
  DEPOSIT: 8000,
};

module.exports = {
  CONTRACT_CONFIG,
  NETWORK_CONFIGS,
  MERCHANT_STATUS,
  PAYMENT_STATUS,
  GAS_LIMITS,
};
