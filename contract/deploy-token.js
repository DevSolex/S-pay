import {
    makeContractDeploy,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    getAddressFromPrivateKey
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;
import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '../.env') });
config();

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error("PRIVATE_KEY not found in .env");
}

const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet'); 
console.log(`Deploying token from address: ${address}`);

async function getNextNonce(addr) {
    console.log(`Fetching next nonce for ${addr}...`);
    try {
        const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${addr}/nonces`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return BigInt(data.possible_next_nonce);
    } catch (error) {
        console.error("Error fetching nonce:", error);
        throw error;
    }
}

async function deployToken() {
    const currentNonce = await getNextNonce(address);
    const contractName = 's-pay-token-v2026-02-17';
    const filePath = 'contracts/s-pay-token.clar';
    const fee = 100000n; // 0.1 STX deployment fee

    console.log(`Preparing deployment transaction for contract '${contractName}' with fee ${fee} microstacks and nonce ${currentNonce}...`);
    const contractContent = readFileSync(filePath, 'utf8');

    try {
        const txOptions = {
            contractName: contractName,
            codeBody: contractContent,
            senderKey: privateKey,
            network,
            anchorMode: AnchorMode.Any,
            fee: fee,
            nonce: currentNonce,
            postConditionMode: PostConditionMode.Allow,
            clarityVersion: 2,
        };

        const transaction = await makeContractDeploy(txOptions);
        console.log(`Broadcasting transaction for ${contractName}...`);
        const response = await broadcastTransaction({ transaction, network });

        if (response.error) {
            console.error(`Deployment of ${contractName} failed:`, response.error);
            if (response.reason) console.error("Reason:", response.reason);
            return null;
        } else {
            console.log(`Deployment of ${contractName} broadcast successfully!`);
            console.log("Transaction ID:", response.txid);
            return response.txid;
        }
    } catch (error) {
        console.error(`Error during deployment of ${contractName}:`, error);
        return null;
    }
}

deployToken().catch(console.error);
