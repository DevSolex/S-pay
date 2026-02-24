'use client';

import { useState } from 'react';
import { merchantWithdraw, reclaimStake } from '@/services/merchant-actions';

export default function MerchantActions() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await merchantWithdraw(Number(amount));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReclaimStake = async () => {
    setLoading(true);
    try {
      await reclaimStake();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Withdraw Amount"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Withdraw Revenue
        </button>
      </div>
      <button
        onClick={handleReclaimStake}
        disabled={loading}
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        Reclaim Stake
      </button>
    </div>
  );
}
