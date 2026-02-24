'use client';

import { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { PostConditionMode, AnchorMode, ClarityValue } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export function useContractCall() {
  const [loading, setLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const call = async (functionName: string, functionArgs: ClarityValue[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const network = getStacksNetwork();
      
      await openContractCall({
        network,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName,
        functionArgs,
        postConditionMode: PostConditionMode.Allow,
        anchorMode: AnchorMode.Any,
        onFinish: (data) => {
          setTxId(data.txId);
          setLoading(false);
        },
        onCancel: () => {
          setError('Transaction cancelled');
          setLoading(false);
        },
      });
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return { call, loading, txId, error };
}
