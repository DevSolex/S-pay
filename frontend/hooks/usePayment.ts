import { useContractCall } from './useContractCall';
import { walletService } from '@/services';

export function usePayment() {
  const { execute, loading, error, result } = useContractCall();

  const processPayment = async (amount: bigint | number, recipient: string) => {
    return execute(() => walletService.processPayment(amount, recipient));
  };

  return { processPayment, loading, error, result };
}
