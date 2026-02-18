export const NETWORK_CONFIG = {
  mainnet: {
    url: 'https://api.mainnet.hiro.so',
    chainId: 1,
    name: 'Mainnet'
  },
  testnet: {
    url: 'https://api.testnet.hiro.so',
    chainId: 2147483648,
    name: 'Testnet'
  }
} as const;

export const CONTRACT_CONFIG = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'SP2DBFGMT7SATSJPCCA38SDDPBNNQ86QWADJ3E6WT',
  name: process.env.NEXT_PUBLIC_CONTRACT_NAME || 's-pay-v3'
} as const;

export const APP_CONFIG = {
  name: 'S-pay',
  description: 'Premium decentralized payment gateway on Stacks',
  version: '1.0.0'
} as const;
