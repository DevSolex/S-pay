import { cacheManager } from './cache-manager';

export interface ProtocolStatus {
  version: string;
  paused: boolean;
  owner: string;
  feePercentage: number;
  totalVolume: bigint;
  totalFeesCollected: bigint;
  requireVerification: boolean;
}

export interface UserData {
  username: string;
  registered: boolean;
  balance: bigint;
  totalSpent: bigint;
}

export interface MerchantData {
  businessName: string;
  status: string;
  balance: bigint;
  totalReceived: bigint;
  stakeAmount: bigint;
}

class APIClient {
  private baseUrl: string;
  private contractAddress: string;

  constructor(contractAddress: string, baseUrl?: string) {
    this.contractAddress = contractAddress;
    this.baseUrl = baseUrl || 'https://api.mainnet.hiro.so';
  }

  async getProtocolStatus(): Promise<ProtocolStatus> {
    const cacheKey = 'protocol-status';
    const cached = cacheManager.get<ProtocolStatus>(cacheKey);
    if (cached) return cached;

    const response = await this.readOnlyCall('get-protocol-status', []);
    cacheManager.set(cacheKey, response, 30000); // 30s cache
    return response;
  }

  async getUserData(address: string): Promise<UserData | null> {
    const cacheKey = `user-${address}`;
    const cached = cacheManager.get<UserData>(cacheKey);
    if (cached) return cached;

    const response = await this.readOnlyCall('get-user-data', [address]);
    if (response) {
      cacheManager.set(cacheKey, response, 60000); // 1min cache
    }
    return response;
  }

  async getMerchantData(address: string): Promise<MerchantData | null> {
    const cacheKey = `merchant-${address}`;
    const cached = cacheManager.get<MerchantData>(cacheKey);
    if (cached) return cached;

    const response = await this.readOnlyCall('get-merchant-data', [address]);
    if (response) {
      cacheManager.set(cacheKey, response, 60000); // 1min cache
    }
    return response;
  }

  async getPrincipalByUsername(username: string): Promise<string | null> {
    const cacheKey = `username-${username}`;
    const cached = cacheManager.get<string>(cacheKey);
    if (cached) return cached;

    const response = await this.readOnlyCall('get-principal-by-username', [username]);
    if (response) {
      cacheManager.set(cacheKey, response, 300000); // 5min cache
    }
    return response;
  }

  async isActiveMerchant(address: string): Promise<boolean> {
    const cacheKey = `active-merchant-${address}`;
    const cached = cacheManager.get<boolean>(cacheKey);
    if (cached !== null) return cached;

    const response = await this.readOnlyCall('is-active-merchant', [address]);
    cacheManager.set(cacheKey, response, 60000); // 1min cache
    return response;
  }

  private async readOnlyCall(functionName: string, args: any[]): Promise<any> {
    const url = `${this.baseUrl}/v2/contracts/call-read/${this.contractAddress}/s-pay/${functionName}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arguments: args }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }

  invalidateUserCache(address: string): void {
    cacheManager.invalidate(`user-${address}`);
  }

  invalidateMerchantCache(address: string): void {
    cacheManager.invalidate(`merchant-${address}`);
    cacheManager.invalidate(`active-merchant-${address}`);
  }
}

export const apiClient = new APIClient(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '');
