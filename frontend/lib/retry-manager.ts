export class RetryManager {
  private maxRetries: number;
  private baseDelay: number;

  constructor(maxRetries = 3, baseDelay = 1000) {
    this.maxRetries = maxRetries;
    this.baseDelay = baseDelay;
  }

  async execute<T>(
    fn: () => Promise<T>,
    options?: {
      onRetry?: (attempt: number, error: Error) => void;
      shouldRetry?: (error: Error) => boolean;
    }
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (options?.shouldRetry && !options.shouldRetry(lastError)) {
          throw lastError;
        }

        if (attempt < this.maxRetries) {
          const delay = this.calculateDelay(attempt);
          options?.onRetry?.(attempt + 1, lastError);
          await this.sleep(delay);
        }
      }
    }

    throw lastError!;
  }

  private calculateDelay(attempt: number): number {
    return this.baseDelay * Math.pow(2, attempt);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const retryManager = new RetryManager();
