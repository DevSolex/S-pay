import { 
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  ClarityValue
} from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function buildAndBroadcastTx(
  functionName: string,
  functionArgs: ClarityValue[],
  senderKey: string
) {
  const network = getStacksNetwork();

  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName,
    functionArgs,
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 50000n,
  };

  const transaction = await makeContractCall(txOptions);
  const response = await broadcastTransaction({ transaction, network });

  return response;
}
