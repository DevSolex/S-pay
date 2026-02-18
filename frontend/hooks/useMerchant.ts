import { useContractCall } from './useContractCall';
import { walletService } from '@/services';

export function useMerchant() {
  const { execute, loading, error, result } = useContractCall();

  const register = async (businessName: string, website: string) => {
    return execute(() => walletService.registerMerchant(businessName, website));
  };

  const withdraw = async (amount: bigint | number) => {
    return execute(() => walletService.merchantWithdraw(amount));
  };

  return { register, withdraw, loading, error, result };
}
