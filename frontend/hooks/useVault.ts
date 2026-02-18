import { useContractCall } from './useContractCall';
import { walletService } from '@/services';

export function useVault() {
  const { execute, loading, error, result } = useContractCall();

  const deposit = async (amount: bigint | number) => {
    return execute(() => walletService.vaultDeposit(amount));
  };

  const withdraw = async (amount: bigint | number) => {
    return execute(() => walletService.vaultWithdraw(amount));
  };

  return { deposit, withdraw, loading, error, result };
}
