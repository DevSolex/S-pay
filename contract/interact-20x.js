import {
    makeContractCall,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    stringAsciiCV,
    boolCV,
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
const contractName = 's-pay-v3';

async function getNextNonce(addr) {
    const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${addr}/nonces`);
    const data = await response.json();
    return BigInt(data.possible_next_nonce);
}

async function performInteraction(nonce) {
    const txOptions = {
        contractAddress,
        contractName,
        functionName: 'update-user-profile',
        functionArgs: [
            stringAsciiCV("S-pay User"), // bio
            stringAsciiCV("https://s-pay.io"), // website
            stringAsciiCV(""), // avatar-url
            boolCV(true), // notifications
            stringAsciiCV("STX") // currency
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

async function run() {
    console.log(`Interacting with ${contractAddress}.${contractName} from ${address}`);
    let nonce = await getNextNonce(address);
    console.log(`Starting with nonce: ${nonce}`);

    for (let i = 0; i < 20; i++) {
        console.log(`Broadcasting transaction ${i + 1}/20...`);
        const txid = await performInteraction(nonce);
        if (txid) {
            console.log(`Transaction ${i + 1} broadcast! TXID: 0x${txid}`);
            nonce++;
        } else {
            console.error(`Failed at transaction ${i + 1}`);
            break;
        }
        // Small delay to avoid rate limiting or issues
        await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log("\nInteraction sequence complete.");
}

run().catch(console.error);
