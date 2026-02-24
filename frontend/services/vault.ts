import { openContractCall } from '@stacks/connect';
import { uintCV, PostConditionMode, AnchorMode } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function vaultDeposit(amount: number) {
  const network = getStacksNetwork();

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'vault-deposit',
    functionArgs: [uintCV(amount)],
    postConditionMode: PostConditionMode.Allow,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Deposit Transaction ID:', data.txId);
    },
  });
}

export async function vaultWithdraw(amount: number) {
  const network = getStacksNetwork();

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'vault-withdraw',
    functionArgs: [uintCV(amount)],
    postConditionMode: PostConditionMode.Allow,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Withdraw Transaction ID:', data.txId);
    },
  });
}
