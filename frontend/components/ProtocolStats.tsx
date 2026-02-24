'use client';

import { useProtocolStatus } from '@/hooks/useProtocolStatus';

export default function ProtocolStats() {
  const { data, loading, error } = useProtocolStatus();

  if (loading) return <div>Loading protocol status...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data?.value) return null;

  const status = data.value;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-600">Version</div>
        <div className="text-xl font-bold">{status.version?.value || 'N/A'}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-600">Status</div>
        <div className="text-xl font-bold">{status.paused?.value ? 'Paused' : 'Active'}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-600">Total Volume</div>
        <div className="text-xl font-bold">{status['total-volume']?.value || '0'}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-600">Fees Collected</div>
        <div className="text-xl font-bold">{status['total-fees-collected']?.value || '0'}</div>
      </div>
    </div>
  );
}
