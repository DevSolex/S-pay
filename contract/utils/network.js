import { STACKS_MAINNET_CONFIG, RETRY_CONFIG } from '../config/constants.js';

export async function fetchWithRetry(url, options = {}) {
    for (let i = 0; i < RETRY_CONFIG.maxRetries; i++) {
        try {
            const response = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(RETRY_CONFIG.timeout)
            });
            return await response.json();
        } catch (error) {
            if (i === RETRY_CONFIG.maxRetries - 1) throw error;
            await new Promise(r => setTimeout(r, RETRY_CONFIG.retryDelay));
        }
    }
}

export async function getNextNonce(address) {
    const url = `${STACKS_MAINNET_CONFIG.apiUrl}/extended/v1/address/${address}/nonces`;
    const data = await fetchWithRetry(url);
    return BigInt(data.possible_next_nonce);
}
