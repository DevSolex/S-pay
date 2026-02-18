export interface WalletConnection {
  address: string;
  network: 'mainnet' | 'testnet';
  connected: boolean;
}

export interface ContractCallResult {
  txId: string;
  success: boolean;
  error?: string;
}

export interface ReadOnlyResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
