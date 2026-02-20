export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private userId?: string;
  private enabled: boolean = true;

  setUserId(userId: string): void {
    this.userId = userId;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  track(name: string, properties?: Record<string, any>): void {
    if (!this.enabled) return;

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
      userId: this.userId,
    };

    this.events.push(event);
    this.sendEvent(event);
  }

  // Payment events
  trackPaymentInitiated(amount: bigint, merchantAddress: string): void {
    this.track('payment_initiated', {
      amount: amount.toString(),
      merchant: merchantAddress,
    });
  }

  trackPaymentCompleted(txId: string, amount: bigint): void {
    this.track('payment_completed', {
      txId,
      amount: amount.toString(),
    });
  }

  trackPaymentFailed(error: string): void {
    this.track('payment_failed', { error });
  }

  // User events
  trackUserRegistered(username: string): void {
    this.track('user_registered', { username });
  }

  trackMerchantRegistered(businessName: string): void {
    this.track('merchant_registered', { businessName });
  }

  // Wallet events
  trackWalletConnected(walletType: string): void {
    this.track('wallet_connected', { walletType });
  }

  trackWalletDisconnected(): void {
    this.track('wallet_disconnected');
  }

  // Page events
  trackPageView(path: string): void {
    this.track('page_view', { path });
  }

  // Dashboard events
  trackDashboardViewed(): void {
    this.track('dashboard_viewed');
  }

  trackWithdrawalInitiated(amount: bigint): void {
    this.track('withdrawal_initiated', { amount: amount.toString() });
  }

  private sendEvent(event: AnalyticsEvent): void {
    // Placeholder for actual analytics service integration
    // In production, this would send to Google Analytics, Mixpanel, etc.
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event);
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const analyticsService = new AnalyticsService();
