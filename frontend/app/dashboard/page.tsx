'use client';

import ConnectButton from '@/components/ConnectButton';
import ProtocolStats from '@/components/ProtocolStats';
import RegisterUserForm from '@/components/RegisterUserForm';
import RegisterMerchantForm from '@/components/RegisterMerchantForm';
import PaymentForm from '@/components/PaymentForm';
import VaultManager from '@/components/VaultManager';
import UserProfile from '@/components/UserProfile';
import MerchantProfile from '@/components/MerchantProfile';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Payment VM Dashboard</h1>
        <ConnectButton />
      </div>

      <div className="mb-8">
        <ProtocolStats />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <UserProfile />
        <MerchantProfile />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-bold mb-4">Register User</h3>
          <RegisterUserForm />
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-bold mb-4">Register Merchant</h3>
          <RegisterMerchantForm />
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-bold mb-4">Send Payment</h3>
          <PaymentForm />
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-bold mb-4">Vault Manager</h3>
          <VaultManager />
        </div>
      </div>
    </div>
  );
}
