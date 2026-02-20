import { useState, useEffect } from 'react';
import { loadingStateManager } from '../lib/loading-state-manager';

export function useLoadingState(key: string) {
  const [state, setState] = useState(loadingStateManager.getState(key));
  const [error, setError] = useState(loadingStateManager.getError(key));

  useEffect(() => {
    const unsubscribe = loadingStateManager.subscribe(key, (entry) => {
      setState(entry.state);
      setError(entry.error);
    });

    return unsubscribe;
  }, [key]);

  return {
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    isIdle: state === 'idle',
    error,
    state,
  };
}
