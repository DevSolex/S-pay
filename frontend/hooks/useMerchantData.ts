'use client';

import { useState, useEffect } from 'react';
import { getMerchantData } from '@/services/user';

export function useMerchantData(address: string | null) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    setLoading(true);
    getMerchantData(address)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [address]);

  return { data, loading, error };
}
