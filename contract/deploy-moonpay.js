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

const privateKey = process.env.PRIVATE_KEY;
const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet');

async function getNonce() {
    const res = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/nonces`);
    const data = await res.json();
    return BigInt(data.possible_next_nonce);
}

async function deploy() {
    console.log(`Deploying from: ${address}`);
    const nonce = await getNonce();
    const contractContent = readFileSync('contracts/s-pay.clar', 'utf8');

    const tx = await makeContractDeploy({
        contractName: 'moonpay',
        codeBody: contractContent,
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        fee: 200000n,
        nonce,
        postConditionMode: PostConditionMode.Allow,
        clarityVersion: 2,
    });

    console.log(`Broadcasting moonpay...`);
    const res = await broadcastTransaction({ transaction: tx, network });

    if (res.error) {
        console.error(`Failed:`, res.error, res.reason);
    } else {
        console.log(`✅ Success! TxID: ${res.txid}`);
        console.log(`https://explorer.hiro.so/txid/0x${res.txid}?chain=mainnet`);
    }
}

deploy().catch(console.error);
