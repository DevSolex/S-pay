import { openContractCall } from '@stacks/connect';
import { uintCV, principalCV, PostConditionMode, AnchorMode } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';
import { createSTXPostCondition } from '@/lib/post-conditions';

export async function securePayment(
  amount: number,
  recipient: string,
  senderAddress: string
) {
  const network = getStacksNetwork();
  const postConditions = [createSTXPostCondition(senderAddress, BigInt(amount))];

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'process-payment',
    functionArgs: [uintCV(amount), principalCV(recipient)],
    postConditions,
    postConditionMode: PostConditionMode.Deny,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Secure Payment TX:', data.txId);
    },
  });
}
