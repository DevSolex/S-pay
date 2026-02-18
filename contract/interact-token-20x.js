import {
    makeContractCall,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    uintCV,
    principalCV,
    noneCV,
    getAddressFromPrivateKey
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env
config({ path: resolve(process.cwd(), '../.env') });
config();

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error("PRIVATE_KEY not found in .env");
}

const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet');
const contractAddress = address; 
const contractName = 's-pay-token-v2026-02-17';

async function getNextNonce(addr) {
    const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${addr}/nonces`);
    const data = await response.json();
    return BigInt(data.possible_next_nonce);
}

async function performTransfer(nonce) {
    const txOptions = {
        contractAddress,
        contractName,
        functionName: 'transfer',
        functionArgs: [
            uintCV(1000), // amount (0.001 SPAY)
            principalCV(address), // sender
            principalCV(address), // recipient (self-transfer for interaction)
            noneCV() // memo
        ],
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        fee: 5000n, // 0.005 STX
        nonce: nonce,
        postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction, network });
    
    if (response.error) {
        console.error(`Transaction failed: ${response.error}`);
        return null;
    }
    return response.txid;
}

async function performMint(nonce) {
    const txOptions = {
        contractAddress,
        contractName,
        functionName: 'mint',
        functionArgs: [
            uintCV(1000000000), // 1000 SPAY
            principalCV(address)
        ],
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        fee: 10000n,
        nonce: nonce,
        postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction, network });
    return response.txid;
}

async function run() {
    console.log(`Interacting with ${contractAddress}.${contractName} from ${address}`);
    let nonce = await getNextNonce(address);
    console.log(`Starting with nonce: ${nonce}`);

    // Perform 20 mint interactions
    for (let i = 0; i < 20; i++) {
        console.log(`Broadcasting mint interaction ${i + 1}/20...`);
        const txid = await performMint(nonce);
        if (txid) {
            console.log(`Interaction ${i + 1} broadcast! TXID: 0x${txid}`);
            nonce++;
        } else {
            console.error(`Failed at interaction ${i + 1}`);
            break;
        }
        // Small delay to avoid API issues
        await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log("\nToken interaction sequence complete.");
}

run().catch(console.error);
