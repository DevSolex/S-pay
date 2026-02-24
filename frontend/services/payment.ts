import { openContractCall } from '@stacks/connect';
import { uintCV, principalCV, PostConditionMode, AnchorMode } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function processPayment(amount: number, recipient: string) {
  const network = getStacksNetwork();

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'process-payment',
    functionArgs: [uintCV(amount), principalCV(recipient)],
    postConditionMode: PostConditionMode.Allow,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Payment Transaction ID:', data.txId);
    },
  });
}
