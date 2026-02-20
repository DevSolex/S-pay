import { useState, useEffect } from 'react';
import { transactionTracker, Transaction } from '../lib/transaction-tracker';

export function useTransaction(txId: string | null) {
  const [transaction, setTransaction] = useState<Transaction | null>(
    txId ? transactionTracker.getTransaction(txId) || null : null
  );

  useEffect(() => {
    if (!txId) {
      setTransaction(null);
      return;
    }

    const unsubscribe = transactionTracker.subscribe(txId, (tx) => {
      setTransaction(tx);
    });

    return unsubscribe;
  }, [txId]);

  return transaction;
}
