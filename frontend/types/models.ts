export interface User {
  username: string;
  registered: boolean;
  stakeAmount: bigint;
}

export interface Merchant {
  businessName: string;
  website: string;
  status: 'pending' | 'verified' | 'suspended';
  tier: string;
  balance: bigint;
}

export interface Payment {
  id: string;
  amount: bigint;
  sender: string;
  recipient: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface Transaction {
  txId: string;
  type: string;
  amount: bigint;
  timestamp: number;
  status: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalTransactions: number;
  activeUsers: number;
  pendingPayments: number;
}
