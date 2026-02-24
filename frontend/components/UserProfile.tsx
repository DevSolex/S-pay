'use client';

import { useAuth } from '@/context/AuthContext';
import { useUserData } from '@/hooks/useUserData';

export default function UserProfile() {
  const { isSignedIn, userData } = useAuth();
  const address = userData?.profile?.stxAddress?.mainnet;
  const { data, loading } = useUserData(address);

  if (!isSignedIn) return <div>Please connect your wallet</div>;
  if (loading) return <div>Loading user data...</div>;
  if (!data?.value) return <div>User not registered</div>;

  const user = data.value;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-2">
        <div><span className="font-semibold">Username:</span> {user.username?.value}</div>
        <div><span className="font-semibold">Total Spent:</span> {user['total-spent']?.value || '0'}</div>
        <div><span className="font-semibold">Total Received:</span> {user['total-received']?.value || '0'}</div>
      </div>
    </div>
  );
}
