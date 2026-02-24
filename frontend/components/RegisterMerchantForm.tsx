'use client';

import { useState } from 'react';
import { registerMerchant } from '@/services/merchant';

export default function RegisterMerchantForm() {
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerMerchant(businessName, website);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Business Name"
        maxLength={64}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website URL"
        maxLength={128}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? 'Registering...' : 'Register Merchant'}
      </button>
    </form>
  );
}
