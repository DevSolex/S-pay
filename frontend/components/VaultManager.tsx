'use client';

import { useState } from 'react';
import { vaultDeposit, vaultWithdraw } from '@/services/vault';

export default function VaultManager() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    setLoading(true);
    try {
      await vaultDeposit(Number(amount));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await vaultWithdraw(Number(amount));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (microSTX)"
        className="w-full px-4 py-2 border rounded"
      />
      <div className="flex gap-2">
        <button
          onClick={handleDeposit}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Deposit
        </button>
        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
