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
// Use 'mainnet' string to avoid undefined transactionVersion error
const address = getAddressFromPrivateKey(privateKey, 'mainnet'); 
console.log(`Deploying from address: ${address}`);

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

async function deployContract(contractName, filePath, fee = 100000n, nonce) {
    console.log(`Preparing deployment transaction for contract '${contractName}' with fee ${fee} microstacks and nonce ${nonce}...`);
    const contractContent = readFileSync(filePath, 'utf8');

    try {
        const txOptions = {
            contractName: contractName,
            codeBody: contractContent,
            senderKey: privateKey,
            network,
            anchorMode: AnchorMode.Any,
            fee: fee,
            nonce: nonce,
            postConditionMode: PostConditionMode.Allow,
            clarityVersion: 2,
        };

        const transaction = await makeContractDeploy(txOptions);
        console.log(`Broadcasting transaction for ${contractName}...`);
        const response = await broadcastTransaction({ transaction, network });

        if (response.error) {
            if (response.reason === 'ContractAlreadyExists') {
                console.log(`Contract '${contractName}' already exists. Skipping deployment.`);
                return 'EXISTS';
            }
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

async function runDeployments() {
    let currentNonce = await getNextNonce(address);
    console.log(`Starting with nonce: ${currentNonce}`);

    // 1. Deploy Trait
    const traitTxId = await deployContract('sip-010-trait', 'contracts/sip-010-trait.clar', 100000n, currentNonce);
    
    if (traitTxId) {
        if (traitTxId !== 'EXISTS') {
            currentNonce++;
        }
    } else {
        console.error("Trait deployment failed and it doesn't exist. Stopping.");
        return;
    }

    // 2. Deploy Main Contract
    console.log("\n--- Deploying Main Contract ---");
    const mainContractTxId = await deployContract('s-pay-v3', 'contracts/s-pay.clar', 100000n, currentNonce);
    
    if (mainContractTxId && mainContractTxId !== 'EXISTS') {
        console.log("\nMain Contract deployment broadcast successfully!");
        console.log(`s-pay-v3: https://explorer.hiro.so/txid/0x${mainContractTxId}?chain=mainnet`);
    } else if (mainContractTxId === 'EXISTS') {
        console.log("\nMain contract already exists.");
    }
}

runDeployments().catch(console.error);
