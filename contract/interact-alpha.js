import {
    makeContractCall,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    getAddressFromPrivateKey,
    uintCV,
    principalCV
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '../.env') });
config();

const privateKey = process.env.PRIVATE_KEY;
const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet');

async function getNextNonce(addr) {
    for (let i = 0; i < 3; i++) {
        try {
            const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${addr}/nonces`, { signal: AbortSignal.timeout(10000) });
            const data = await response.json();
            return BigInt(data.possible_next_nonce);
        } catch (e) {
            if (i === 2) throw e;
            await new Promise(r => setTimeout(r, 2000));
        }
    }
}

async function mintToken(nonce) {
    const txOptions = {
        contractAddress: address,
        contractName: 'alpha-token',
        functionName: 'mint',
        functionArgs: [uintCV(1000000), principalCV(address)],
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        fee: 4000n,
        nonce,
        postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction, network });

    if (response.error) {
        console.error(`TX failed:`, response.error);
        return null;
    }
    
    console.log(`✓ ${response.txid}`);
    return response.txid;
}

async function run() {
    console.log(`Interacting with alpha-token from: ${address}\n`);
    let nonce = await getNextNonce(address);

    for (let i = 0; i < 35; i++) {
        await mintToken(nonce);
        nonce++;
        await new Promise(r => setTimeout(r, 300));
    }
    
    console.log('\n35 transactions complete!');
}

run().catch(console.error);
