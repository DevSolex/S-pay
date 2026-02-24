'use client';

import { useState } from 'react';
import { processPayment } from '@/services/payment';

export default function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await processPayment(Number(amount), recipient);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (microSTX)"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Send Payment'}
      </button>
    </form>
  );
}
