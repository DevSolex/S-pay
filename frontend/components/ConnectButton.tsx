'use client';

import { useAuth } from '@/context/AuthContext';

export default function ConnectButton() {
  const { isSignedIn, userData, connect, disconnect } = useAuth();

  if (isSignedIn && userData) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">{userData.profile.stxAddress.mainnet}</span>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Connect Wallet
    </button>
  );
}
