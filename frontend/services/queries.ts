import { callReadOnlyFunction, cvToJSON, stringAsciiCV } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function getPrincipalByUsername(username: string) {
  const network = getStacksNetwork();
  
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-principal-by-username',
    functionArgs: [stringAsciiCV(username)],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result);
}

export async function getUserProfile(address: string) {
  const network = getStacksNetwork();
  
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-user-profile',
    functionArgs: [stringAsciiCV(address)],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result);
}

export async function getTotalUsers() {
  const network = getStacksNetwork();
  
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-total-users',
    functionArgs: [],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });

  return cvToJSON(result);
}
