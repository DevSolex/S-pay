import {
    makeContractCall,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    getAddressFromPrivateKey,
    stringAsciiCV,
    uintCV,
    principalCV
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '../.env') });

const privateKey = process.env.PRIVATE_KEY;
const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet');
const contractAddress = 'SP2DBFGMT7SATSJPCCA38SDDPBNNQ86QWADJ3E6WT';
const contractName = 'spay-engine';

async function getNonce() {
    const res = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/nonces`);
    const data = await res.json();
    return BigInt(data.possible_next_nonce);
}

async function call(functionName, functionArgs, nonce) {
    const tx = await makeContractCall({
        contractAddress,
        contractName,
        functionName,
        functionArgs,
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        fee: 50000n,
        nonce,
        postConditionMode: PostConditionMode.Allow,
    });

    const res = await broadcastTransaction({ transaction: tx, network });
    console.log(res.error ? `❌ ${functionName}` : `✅ ${functionName} - ${res.txid}`);
    return res;
}

async function run() {
    let nonce = await getNonce();
    console.log(`Starting nonce: ${nonce}\n`);

    await call('register-user', [stringAsciiCV('user1')], nonce++);
    await call('vault-deposit', [uintCV(1000000)], nonce++);
    await call('register-user', [stringAsciiCV('user2')], nonce++);
    await call('vault-deposit', [uintCV(500000)], nonce++);
    await call('register-user', [stringAsciiCV('user3')], nonce++);
    await call('vault-deposit', [uintCV(750000)], nonce++);
    await call('vault-withdraw', [uintCV(100000)], nonce++);
    await call('vault-deposit', [uintCV(250000)], nonce++);
    await call('vault-withdraw', [uintCV(50000)], nonce++);
    await call('vault-deposit', [uintCV(300000)], nonce++);

    console.log('\n✅ 10 interactions completed!');
}

run().catch(console.error);
