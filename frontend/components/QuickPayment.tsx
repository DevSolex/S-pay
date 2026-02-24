'use client';

import { useState } from 'react';
import { useContractCall } from '@/hooks/useContractCall';
import { uintCV, principalCV } from '@stacks/transactions';

export default function QuickPayment() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const { call, loading, txId, error } = useContractCall();

  const handlePay = async () => {
    await call('process-payment', [uintCV(Number(amount)), principalCV(recipient)]);
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h3 className="text-lg font-bold">Quick Payment</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
        className="w-full px-3 py-2 border rounded"
      />
      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {txId && <div className="text-sm text-green-600">TX: {txId}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
}
