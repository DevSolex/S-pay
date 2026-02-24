import { callReadOnlyFunction, cvToJSON, principalCV } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function getUserData(address: string) {
  const network = getStacksNetwork();
  
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-user-data',
    functionArgs: [principalCV(address)],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result);
}

export async function getMerchantData(address: string) {
  const network = getStacksNetwork();
  
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-merchant-data',
    functionArgs: [principalCV(address)],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result);
}

export async function isActiveMerchant(address: string) {
  const network = getStacksNetwork();
  
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'is-active-merchant',
    functionArgs: [principalCV(address)],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result);
}
