import { openContractCall } from '@stacks/connect';
import { stringAsciiCV, PostConditionMode, AnchorMode } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export async function updateUserProfile(bio: string, website: string, avatar: string) {
  const network = getStacksNetwork();

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'update-user-profile',
    functionArgs: [stringAsciiCV(bio), stringAsciiCV(website), stringAsciiCV(avatar)],
    postConditionMode: PostConditionMode.Allow,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Profile Update TX:', data.txId);
    },
  });
}
