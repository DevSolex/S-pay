import { useState, useCallback } from 'react';
import { walletService } from '@/services';
import type { ContractCallResult } from '@/types';

export function useContractCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ContractCallResult | null>(null);

  const execute = useCallback(async (
    fn: () => Promise<any>
  ): Promise<ContractCallResult> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fn();
      const result = { txId: data.txId, success: true };
      setResult(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Transaction failed';
      setError(error);
      return { txId: '', success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setResult(null);
  }, []);

  return { execute, loading, error, result, reset };
}
