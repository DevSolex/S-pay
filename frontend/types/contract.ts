export interface UserData {
  username: string;
  registered: boolean;
  totalSpent: bigint;
  totalReceived: bigint;
}

export interface MerchantData {
  businessName: string;
  website: string;
  status: string;
  verified: boolean;
  totalRevenue: bigint;
  transactionCount: number;
}

export interface ProtocolStatus {
  version: string;
  paused: boolean;
  owner: string;
  feePercentage: number;
  totalVolume: bigint;
  totalFeesCollected: bigint;
  requireVerification: boolean;
}
