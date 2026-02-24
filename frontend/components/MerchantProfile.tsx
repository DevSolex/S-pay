'use client';

import { useAuth } from '@/context/AuthContext';
import { useMerchantData } from '@/hooks/useMerchantData';

export default function MerchantProfile() {
  const { isSignedIn, userData } = useAuth();
  const address = userData?.profile?.stxAddress?.mainnet;
  const { data, loading } = useMerchantData(address);

  if (!isSignedIn) return <div>Please connect your wallet</div>;
  if (loading) return <div>Loading merchant data...</div>;
  if (!data?.value) return <div>Not registered as merchant</div>;

  const merchant = data.value;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Merchant Profile</h2>
      <div className="space-y-2">
        <div><span className="font-semibold">Business:</span> {merchant['business-name']?.value}</div>
        <div><span className="font-semibold">Website:</span> {merchant.website?.value}</div>
        <div><span className="font-semibold">Status:</span> {merchant.status?.value}</div>
        <div><span className="font-semibold">Revenue:</span> {merchant['total-revenue']?.value || '0'}</div>
        <div><span className="font-semibold">Transactions:</span> {merchant['transaction-count']?.value || '0'}</div>
      </div>
    </div>
  );
}
