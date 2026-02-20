import { PAYMENT_STATUS } from './constants-extended';

export type TransactionStatus = 'pending' | 'broadcasting' | 'confirmed' | 'failed';

export interface Transaction {
  txId: string;
  status: TransactionStatus;
  timestamp: number;
  confirmations: number;
  error?: string;
}

class TransactionTracker {
  private transactions: Map<string, Transaction> = new Map();
  private listeners: Map<string, Set<(tx: Transaction) => void>> = new Map();

  track(txId: string): void {
    if (!this.transactions.has(txId)) {
      this.transactions.set(txId, {
        txId,
        status: 'pending',
        timestamp: Date.now(),
        confirmations: 0,
      });
    }
  }

  updateStatus(txId: string, status: TransactionStatus, error?: string): void {
    const tx = this.transactions.get(txId);
    if (tx) {
      tx.status = status;
      if (error) tx.error = error;
      this.notifyListeners(txId, tx);
    }
  }

  updateConfirmations(txId: string, confirmations: number): void {
    const tx = this.transactions.get(txId);
    if (tx) {
      tx.confirmations = confirmations;
      if (confirmations > 0 && tx.status === 'broadcasting') {
        tx.status = 'confirmed';
      }
      this.notifyListeners(txId, tx);
    }
  }

  getTransaction(txId: string): Transaction | undefined {
    return this.transactions.get(txId);
  }

  subscribe(txId: string, callback: (tx: Transaction) => void): () => void {
    if (!this.listeners.has(txId)) {
      this.listeners.set(txId, new Set());
    }
    this.listeners.get(txId)!.add(callback);

    return () => {
      const listeners = this.listeners.get(txId);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(txId);
        }
      }
    };
  }

  private notifyListeners(txId: string, tx: Transaction): void {
    const listeners = this.listeners.get(txId);
    if (listeners) {
      listeners.forEach(callback => callback(tx));
    }
  }

  clear(txId: string): void {
    this.transactions.delete(txId);
    this.listeners.delete(txId);
  }

  clearAll(): void {
    this.transactions.clear();
    this.listeners.clear();
  }
}

export const transactionTracker = new TransactionTracker();
