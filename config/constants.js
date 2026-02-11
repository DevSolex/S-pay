export const MAINNET_CONFIG = {
  contractAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
  contractName: "s-pay",
  tokenContractName: "s-pay-token",
  network: "mainnet",
  apiUrl: "https://stacks-node-api.mainnet.stacks.co",
};

export const TESTNET_CONFIG = {
  contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractName: "s-pay",
  tokenContractName: "s-pay-token",
  network: "testnet",
  apiUrl: "https://stacks-node-api.testnet.stacks.co",
};

export const FEE_CONSTANTS = {
  DEFAULT_FEE_PERCENTAGE: 200, // 2%
  MIN_FEE_PERCENTAGE: 0,
  MAX_FEE_PERCENTAGE: 1000, // 10%
};

export const STAKE_CONSTANTS = {
  MERCHANT_STAKE: 1000000, // 1 STX
  MIN_PAYMENT: 100000, // 0.1 STX
};

export const ERROR_CODES = {
  ERR_OWNER_ONLY: 100,
  ERR_NOT_TOKEN_OWNER: 101,
  ERR_USER_NOT_FOUND: 102,
  ERR_USERNAME_TAKEN: 103,
  ERR_ALREADY_REGISTERED: 104,
  ERR_CONTRACT_PAUSED: 105,
  ERR_INSUFFICIENT_FUNDS: 106,
  ERR_MERCHANT_NOT_VERIFIED: 107,
};
