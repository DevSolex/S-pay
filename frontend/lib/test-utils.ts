import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';

export const mockWallet = {
  address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  connected: true,
  network: 'testnet',
};

export const mockTransaction = {
  txId: '0x1234567890abcdef',
  status: 'confirmed' as const,
  timestamp: Date.now(),
  confirmations: 1,
};

export const mockUser = {
  username: 'testuser',
  registered: true,
  balance: 1000000n,
  totalSpent: 500000n,
};

export const mockMerchant = {
  businessName: 'Test Business',
  status: 'verified',
  balance: 5000000n,
  totalReceived: 10000000n,
  stakeAmount: 1000000n,
};

export function createMockContractCall<T>(returnValue: T) {
  return vi.fn().mockResolvedValue(returnValue);
}

export function createMockWalletProvider() {
  return {
    connect: vi.fn().mockResolvedValue(mockWallet),
    disconnect: vi.fn().mockResolvedValue(undefined),
    signTransaction: vi.fn().mockResolvedValue(mockTransaction),
    getAddress: vi.fn().mockReturnValue(mockWallet.address),
  };
}

export function waitForNextUpdate(timeout = 1000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export function mockLocalStorage() {
  const store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
  };
}

export function mockFetch(response: any, status = 200) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(response),
    text: vi.fn().mockResolvedValue(JSON.stringify(response)),
  });
}

export function createTestWrapper(providers: React.ComponentType<any>[]) {
  return ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
}

export async function flushPromises() {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });
}

export const testAddresses = {
  user1: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  user2: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
  merchant1: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC',
  contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.s-pay',
};

export const testAmounts = {
  oneSTX: 1000000n,
  tenSTX: 10000000n,
  hundredSTX: 100000000n,
};
