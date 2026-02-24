import { openContractCall } from '@stacks/connect';
import { 
  uintCV, 
  principalCV, 
  listCV,
  tupleCV,
  PostConditionMode, 
  AnchorMode 
} from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

interface BatchPayment {
  recipient: string;
  amount: number;
}

export async function batchPayments(payments: BatchPayment[]) {
  const network = getStacksNetwork();

  const paymentList = listCV(
    payments.map(p => 
      tupleCV({
        recipient: principalCV(p.recipient),
        amount: uintCV(p.amount)
      })
    )
  );

  await openContractCall({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'batch-process-payments',
    functionArgs: [paymentList],
    postConditionMode: PostConditionMode.Allow,
    anchorMode: AnchorMode.Any,
    onFinish: (data) => {
      console.log('Batch Payment TX:', data.txId);
    },
  });
}
