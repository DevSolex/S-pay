export interface WalletConnection {
  address: string;
  network: 'mainnet' | 'testnet';
  walletType: 'xverse' | 'leather' | 'hiro';
}

class WalletConnectionManager {
  private connection: WalletConnection | null = null;
  private listeners: Set<(connection: WalletConnection | null) => void> = new Set();

  async connect(walletType: WalletConnection['walletType']): Promise<WalletConnection> {
    // Placeholder for actual wallet connection logic
    const connection: WalletConnection = {
      address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      network: 'testnet',
      walletType,
    };

    this.connection = connection;
    this.notifyListeners();
    this.persistConnection(connection);

    return connection;
  }

  disconnect(): void {
    this.connection = null;
    this.notifyListeners();
    this.clearPersistedConnection();
  }

  getConnection(): WalletConnection | null {
    return this.connection;
  }

  isConnected(): boolean {
    return this.connection !== null;
  }

  subscribe(listener: (connection: WalletConnection | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.connection));
  }

  private persistConnection(connection: WalletConnection): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wallet_connection', JSON.stringify(connection));
    }
  }

  private clearPersistedConnection(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wallet_connection');
    }
  }

  restoreConnection(): WalletConnection | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem('wallet_connection');
    if (stored) {
      try {
        this.connection = JSON.parse(stored);
        return this.connection;
      } catch {
        this.clearPersistedConnection();
      }
    }
    return null;
  }
}

export const walletConnectionManager = new WalletConnectionManager();
