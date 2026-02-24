import { openContractCall } from '@stacks/connect';
import { uintCV, PostConditionMode, AnchorMode } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function merchantWithdraw(amount: number) {
  const network = getStacksNetwork();

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'merchant-withdraw',
    functionArgs: [uintCV(amount)],
    postConditionMode: PostConditionMode.Allow,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Merchant Withdraw TX:', data.txId);
    },
  });
}

export async function reclaimStake() {
  const network = getStacksNetwork();

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'reclaim-stake',
    functionArgs: [],
    postConditionMode: PostConditionMode.Allow,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Reclaim Stake TX:', data.txId);
    },
  });
}
