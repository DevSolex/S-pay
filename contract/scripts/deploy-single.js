import { getAddressFromPrivateKey } from '@stacks/transactions';
import { loadEnvironment, getPrivateKey } from './utils/env.js';
import { getNextNonce } from './utils/network.js';
import { logSuccess, logError } from './utils/logger.js';
import { ContractDeployer } from './services/deployer.js';
import { DEFAULT_TX_OPTIONS } from './config/constants.js';
import { readFileSync } from 'fs';

loadEnvironment();

const privateKey = getPrivateKey();
const address = getAddressFromPrivateKey(privateKey, 'mainnet');
const deployer = new ContractDeployer(privateKey);

async function deployContract(contractName, filePath, fee) {
    try {
        const codeBody = readFileSync(filePath, 'utf8');
        const nonce = await getNextNonce(address);
        
        console.log(`Deploying ${contractName}...`);
        const result = await deployer.deploy(contractName, codeBody, fee, nonce);
        
        if (result.exists) {
            console.log(`Contract '${contractName}' already exists`);
            return;
        }
        
        logSuccess(`${contractName} deployed`, result.txid);
    } catch (error) {
        logError(`Failed to deploy ${contractName}`, error.message);
    }
}

const contractName = process.argv[2] || 'payer-token';
const filePath = process.argv[3] || `contracts/${contractName}.clar`;
const fee = process.argv[4] ? BigInt(process.argv[4]) : DEFAULT_TX_OPTIONS.tokenFee;

deployContract(contractName, filePath, fee).catch(console.error);
