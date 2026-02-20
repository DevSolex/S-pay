type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface LoadingEntry {
  state: LoadingState;
  error?: string;
  startTime?: number;
}

class LoadingStateManager {
  private states: Map<string, LoadingEntry> = new Map();
  private listeners: Map<string, Set<(entry: LoadingEntry) => void>> = new Map();

  setLoading(key: string): void {
    this.updateState(key, { state: 'loading', startTime: Date.now() });
  }

  setSuccess(key: string): void {
    this.updateState(key, { state: 'success' });
  }

  setError(key: string, error: string): void {
    this.updateState(key, { state: 'error', error });
  }

  setIdle(key: string): void {
    this.updateState(key, { state: 'idle' });
  }

  getState(key: string): LoadingState {
    return this.states.get(key)?.state || 'idle';
  }

  getError(key: string): string | undefined {
    return this.states.get(key)?.error;
  }

  isLoading(key: string): boolean {
    return this.getState(key) === 'loading';
  }

  getDuration(key: string): number | null {
    const entry = this.states.get(key);
    if (!entry?.startTime) return null;
    return Date.now() - entry.startTime;
  }

  subscribe(key: string, callback: (entry: LoadingEntry) => void): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(callback);

    // Immediately call with current state
    const current = this.states.get(key);
    if (current) {
      callback(current);
    }

    return () => {
      const listeners = this.listeners.get(key);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(key);
        }
      }
    };
  }

  private updateState(key: string, entry: LoadingEntry): void {
    const existing = this.states.get(key);
    const updated = { ...existing, ...entry };
    this.states.set(key, updated);
    this.notifyListeners(key, updated);
  }

  private notifyListeners(key: string, entry: LoadingEntry): void {
    const listeners = this.listeners.get(key);
    if (listeners) {
      listeners.forEach(callback => callback(entry));
    }
  }

  clear(key: string): void {
    this.states.delete(key);
    this.listeners.delete(key);
  }

  clearAll(): void {
    this.states.clear();
    this.listeners.clear();
  }

  getAll(): Record<string, LoadingEntry> {
    return Object.fromEntries(this.states);
  }
}

export const loadingStateManager = new LoadingStateManager();
