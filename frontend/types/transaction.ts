export interface TransactionResponse {
  txId: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
}

export interface ContractCallOptions {
  onSuccess?: (txId: string) => void;
  onError?: (error: Error) => void;
  onFinish?: (data: any) => void;
}
