'use client';

import { useState, useEffect } from 'react';
import { getTotalUsers } from '@/services/queries';

export default function UserStats() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTotalUsers()
      .then((result) => {
        if (result?.value) {
          setTotalUsers(Number(result.value));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Total Users</h3>
      <div className="text-4xl font-bold">{totalUsers}</div>
    </div>
  );
}
