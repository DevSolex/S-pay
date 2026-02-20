import { MerchantData } from './api-client';
import { cacheManager } from './cache-manager';

export interface MerchantProfile extends MerchantData {
  address: string;
  rating?: number;
  reviewCount?: number;
  lastActive?: number;
}

class MerchantProfileManager {
  private profiles: Map<string, MerchantProfile> = new Map();

  async getProfile(address: string): Promise<MerchantProfile | null> {
    const cacheKey = `merchant-profile-${address}`;
    const cached = cacheManager.get<MerchantProfile>(cacheKey);
    if (cached) return cached;

    const profile = this.profiles.get(address);
    if (profile) {
      cacheManager.set(cacheKey, profile, 120000); // 2min cache
      return profile;
    }

    return null;
  }

  updateProfile(address: string, updates: Partial<MerchantProfile>): void {
    const existing = this.profiles.get(address);
    const updated = { ...existing, ...updates, address } as MerchantProfile;
    this.profiles.set(address, updated);
    cacheManager.invalidate(`merchant-profile-${address}`);
  }

  setRating(address: string, rating: number, reviewCount: number): void {
    this.updateProfile(address, { rating, reviewCount });
  }

  updateLastActive(address: string): void {
    this.updateProfile(address, { lastActive: Date.now() });
  }

  async getTopMerchants(limit: number = 10): Promise<MerchantProfile[]> {
    const merchants = Array.from(this.profiles.values())
      .filter(m => m.status === 'verified')
      .sort((a, b) => {
        const ratingDiff = (b.rating || 0) - (a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return Number(b.totalReceived - a.totalReceived);
      })
      .slice(0, limit);

    return merchants;
  }

  async searchMerchants(query: string): Promise<MerchantProfile[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.profiles.values()).filter(
      m =>
        m.businessName.toLowerCase().includes(lowerQuery) ||
        m.address.toLowerCase().includes(lowerQuery)
    );
  }

  getStats(address: string): {
    totalReceived: bigint;
    averageTransaction: bigint;
    rating: number;
  } | null {
    const profile = this.profiles.get(address);
    if (!profile) return null;

    return {
      totalReceived: profile.totalReceived,
      averageTransaction: profile.totalReceived / BigInt(profile.reviewCount || 1),
      rating: profile.rating || 0,
    };
  }

  clear(): void {
    this.profiles.clear();
  }
}

export const merchantProfileManager = new MerchantProfileManager();
