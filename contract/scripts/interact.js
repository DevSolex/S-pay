import { getAddressFromPrivateKey, uintCV, principalCV } from '@stacks/transactions';
import { loadEnvironment, getPrivateKey } from './utils/env.js';
import { getNextNonce } from './utils/network.js';
import { logSuccess, logError } from './utils/logger.js';
import { ContractInteractor } from './services/interactor.js';
import { DEFAULT_TX_OPTIONS } from './config/constants.js';

loadEnvironment();

const privateKey = getPrivateKey();
const address = getAddressFromPrivateKey(privateKey, 'mainnet');
const interactor = new ContractInteractor(privateKey, address);

async function interact(contractName, txCount, mintAmount) {
    console.log(`Interacting with ${contractName} from: ${address}\n`);
    let nonce = await getNextNonce(address);

    for (let i = 0; i < txCount; i++) {
        try {
            const result = await interactor.call(
                contractName,
                'mint',
                [uintCV(mintAmount), principalCV(address)],
                DEFAULT_TX_OPTIONS.interactionFee,
                nonce
            );
            
            console.log(`✓ TX ${i + 1}/${txCount}: ${result.txid}`);
            nonce++;
            await new Promise(r => setTimeout(r, 300));
        } catch (error) {
            logError(`TX ${i + 1} failed`, error.message);
        }
    }
    
    console.log(`\n${txCount} transactions complete!`);
}

const contractName = process.argv[2] || 'alpha-token';
const txCount = parseInt(process.argv[3]) || 35;
const mintAmount = parseInt(process.argv[4]) || 1000000;

interact(contractName, txCount, mintAmount).catch(console.error);
