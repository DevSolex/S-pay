import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { CURRENT_NETWORK, NETWORK_CONFIG } from '@/config/network';

export function getStacksNetwork() {
  return CURRENT_NETWORK === 'mainnet' 
    ? new StacksMainnet({ url: NETWORK_CONFIG.mainnet.url })
    : new StacksTestnet({ url: NETWORK_CONFIG.testnet.url });
}
