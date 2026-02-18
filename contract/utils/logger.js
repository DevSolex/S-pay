import { STACKS_MAINNET_CONFIG } from '../config/constants.js';

export function getExplorerUrl(txid) {
    return `${STACKS_MAINNET_CONFIG.explorerUrl}/txid/0x${txid}?chain=${STACKS_MAINNET_CONFIG.network}`;
}

export function logSuccess(message, txid = null) {
    console.log(`✓ ${message}`);
    if (txid) {
        console.log(`  TX: ${txid}`);
        console.log(`  Explorer: ${getExplorerUrl(txid)}`);
    }
}

export function logError(message, error = null) {
    console.error(`✗ ${message}`);
    if (error) console.error(`  Error:`, error);
}
