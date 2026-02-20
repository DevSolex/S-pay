export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  REGISTER: '/register',
  MERCHANT_REGISTER: '/merchant/register',
  PAY: '/pay',
  VAULT: '/vault',
  TRANSACTIONS: '/transactions',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

export const API_ENDPOINTS = {
  PROTOCOL_STATUS: '/api/protocol/status',
  USER_DATA: '/api/user/:address',
  MERCHANT_DATA: '/api/merchant/:address',
  TRANSACTIONS: '/api/transactions',
  ANALYTICS: '/api/analytics',
} as const;

export const STORAGE_KEYS = {
  WALLET_CONNECTION: 'wallet_connection',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const QUERY_KEYS = {
  PROTOCOL_STATUS: 'protocol-status',
  USER_DATA: 'user-data',
  MERCHANT_DATA: 'merchant-data',
  TRANSACTIONS: 'transactions',
  DASHBOARD_DATA: 'dashboard-data',
} as const;

export const EVENT_NAMES = {
  WALLET_CONNECTED: 'wallet:connected',
  WALLET_DISCONNECTED: 'wallet:disconnected',
  PAYMENT_INITIATED: 'payment:initiated',
  PAYMENT_COMPLETED: 'payment:completed',
  PAYMENT_FAILED: 'payment:failed',
  USER_REGISTERED: 'user:registered',
  MERCHANT_REGISTERED: 'merchant:registered',
} as const;

export const TIMEOUTS = {
  TRANSACTION: 60000, // 1 minute
  API_CALL: 30000, // 30 seconds
  NOTIFICATION: 5000, // 5 seconds
  DEBOUNCE: 300, // 300ms
  THROTTLE: 1000, // 1 second
} as const;

export const LIMITS = {
  MAX_USERNAME_LENGTH: 24,
  MAX_BUSINESS_NAME_LENGTH: 50,
  MAX_MEMO_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_STAKE_AMOUNT: 1000000n, // 1 STX
  MAX_TRANSACTIONS_PER_PAGE: 50,
} as const;
