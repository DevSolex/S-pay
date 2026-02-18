export const STACKS_MAINNET_CONFIG = {
    apiUrl: 'https://api.mainnet.hiro.so',
    explorerUrl: 'https://explorer.hiro.so',
    network: 'mainnet'
};

export const DEFAULT_TX_OPTIONS = {
    fee: 100000n,
    tokenFee: 10000n,
    interactionFee: 4000n
};

export const RETRY_CONFIG = {
    maxRetries: 3,
    retryDelay: 2000,
    timeout: 10000
};
