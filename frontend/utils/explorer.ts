import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export function getExplorerTxUrl(txId: string): string {
  return `https://explorer.hiro.so/txid/${txId}?chain=mainnet`;
}

export function getExplorerAddressUrl(address: string): string {
  return `https://explorer.hiro.so/address/${address}?chain=mainnet`;
}

export function getExplorerContractUrl(): string {
  return `https://explorer.hiro.so/txid/${CONTRACT_ADDRESS}.${CONTRACT_NAME}?chain=mainnet`;
}
