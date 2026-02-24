import { openContractCall } from '@stacks/connect';
import { stringAsciiCV, PostConditionMode, AnchorMode } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function registerMerchant(businessName: string, website: string) {
  const network = getStacksNetwork();

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'register-merchant',
    functionArgs: [stringAsciiCV(businessName), stringAsciiCV(website)],
    postConditionMode: PostConditionMode.Allow,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Transaction ID:', data.txId);
    },
  });
}
