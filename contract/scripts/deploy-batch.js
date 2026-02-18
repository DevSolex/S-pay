import { getAddressFromPrivateKey } from '@stacks/transactions';
import { loadEnvironment, getPrivateKey } from './utils/env.js';
import { getNextNonce } from './utils/network.js';
import { logSuccess, logError } from './utils/logger.js';
import { ContractDeployer } from './services/deployer.js';
import { generateTokenContract } from './templates/token.js';
import { DEFAULT_TX_OPTIONS } from './config/constants.js';
import { writeFileSync } from 'fs';

loadEnvironment();

const privateKey = getPrivateKey();
const address = getAddressFromPrivateKey(privateKey, 'mainnet');
const deployer = new ContractDeployer(privateKey);

const tokens = [
    { name: 'alpha-token', symbol: 'ALPHA' },
    { name: 'beta-token', symbol: 'BETA' },
    { name: 'gamma-token', symbol: 'GAMMA' },
    { name: 'delta-token', symbol: 'DELTA' },
    { name: 'epsilon-token', symbol: 'EPSILON' },
    { name: 'zeta-token', symbol: 'ZETA' },
    { name: 'eta-token', symbol: 'ETA' },
    { name: 'theta-token', symbol: 'THETA' },
    { name: 'iota-token', symbol: 'IOTA' },
    { name: 'kappa-token', symbol: 'KAPPA' }
];

async function deployBatch() {
    console.log(`Deploying from: ${address}\n`);
    let nonce = await getNextNonce(address);

    for (const token of tokens) {
        try {
            const code = generateTokenContract(token.name, token.symbol);
            writeFileSync(`contracts/${token.name}.clar`, code);
            
            const result = await deployer.deploy(
                token.name, 
                code, 
                DEFAULT_TX_OPTIONS.tokenFee, 
                nonce
            );
            
            if (!result.exists) {
                logSuccess(token.name, result.txid);
                nonce++;
            }
            
            await new Promise(r => setTimeout(r, 500));
        } catch (error) {
            logError(`${token.name} deployment failed`, error.message);
        }
    }
    
    console.log('\nBatch deployment complete!');
}

deployBatch().catch(console.error);
