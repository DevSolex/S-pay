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

async function deploy(name, nonce) {
    const contractContent = readFileSync('contracts/s-pay.clar', 'utf8');
    const tx = await makeContractDeploy({
        contractName: name,
        codeBody: contractContent,
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        fee: 280000n, // 0.28 STX
        nonce,
        postConditionMode: PostConditionMode.Allow,
        clarityVersion: 2,
    });

    const res = await broadcastTransaction({ transaction: tx, network });
    console.log(res.error ? `❌ ${name}` : `✅ ${name} - ${res.txid}`);
    return res;
}

async function run() {
    let nonce = await getNonce();
    console.log(`Deploying 5 contracts with 0.28 STX fee\n`);

    await deploy('moonpay-v1', nonce++);
    await deploy('moonpay-v2', nonce++);
    await deploy('moonpay-v3', nonce++);
    await deploy('moonpay-v4', nonce++);
    await deploy('moonpay-v5', nonce++);

    console.log('\n✅ 5 deployments completed!');
}

run().catch(console.error);
