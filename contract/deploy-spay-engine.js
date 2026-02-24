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
if (!privateKey) throw new Error("PRIVATE_KEY not found");

const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet');

async function getNextNonce(addr) {
    const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${addr}/nonces`);
    const data = await response.json();
    return BigInt(data.possible_next_nonce);
}

async function deploy() {
    console.log(`Deploying from: ${address}`);
    const nonce = await getNextNonce(address);
    console.log(`Nonce: ${nonce}`);

    const contractContent = readFileSync('contracts/s-pay.clar', 'utf8');
    const fee = 200000n; // 0.2 STX

    const txOptions = {
        contractName: 'spay-engine',
        codeBody: contractContent,
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        fee,
        nonce,
        postConditionMode: PostConditionMode.Allow,
        clarityVersion: 2,
    };

    const transaction = await makeContractDeploy(txOptions);
    console.log(`Broadcasting spay-engine with fee ${fee / 1000000n} STX...`);
    const response = await broadcastTransaction({ transaction, network });

    if (response.error) {
        console.error(`Failed:`, response.error, response.reason);
    } else {
        console.log(`Success! TxID: ${response.txid}`);
        console.log(`https://explorer.hiro.so/txid/0x${response.txid}?chain=mainnet`);
    }
}

deploy().catch(console.error);
