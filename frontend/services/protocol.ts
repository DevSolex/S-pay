import { callReadOnlyFunction, cvToJSON } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function getProtocolStatus() {
  const network = getStacksNetwork();
  
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-protocol-status',
    functionArgs: [],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result);
}
