'use client';

import { useState, useEffect } from 'react';
import { callReadOnlyFunction, cvToJSON, principalCV } from '@stacks/transactions';
import { getStacksNetwork } from '@/lib/stacks-network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/network';

export function useContractRead(functionName: string, args: any[] = []) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const network = getStacksNetwork();
        const result = await callReadOnlyFunction({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName,
          functionArgs: args,
          network,
          senderAddress: CONTRACT_ADDRESS,
        });
        setData(cvToJSON(result));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [functionName, JSON.stringify(args)]);

  return { data, loading, error };
}
