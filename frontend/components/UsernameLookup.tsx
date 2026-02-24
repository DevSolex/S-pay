'use client';

import { useState } from 'react';
import { getPrincipalByUsername } from '@/services/queries';

export default function UsernameLookup() {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    setLoading(true);
    try {
      const result = await getPrincipalByUsername(username);
      if (result?.value) {
        setAddress(result.value);
      } else {
        setAddress('Not found');
      }
    } catch (error) {
      console.error(error);
      setAddress('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h3 className="text-lg font-bold">Username Lookup</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleLookup}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Looking up...' : 'Lookup'}
        </button>
      </div>
      {address && (
        <div className="p-3 bg-gray-100 rounded text-sm break-all">
          {address}
        </div>
      )}
    </div>
  );
}
