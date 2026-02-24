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

async function callContract(functionName, functionArgs, nonce) {
    const txOptions = {
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
    };

    const tx = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction: tx, network });
    
    if (response.error) {
        console.error(`❌ ${functionName} failed:`, response.error);
    } else {
        console.log(`✅ ${functionName} - TxID: ${response.txid}`);
        console.log(`   https://explorer.hiro.so/txid/0x${response.txid}?chain=mainnet`);
    }
    return response;
}

async function run() {
    let nonce = await getNonce();
    console.log(`Starting nonce: ${nonce}\n`);

    // 1. Register User
    await callContract('register-user', [stringAsciiCV('spayuser')], nonce++);
    await new Promise(r => setTimeout(r, 2000));

    // 2. Register Merchant
    await callContract('register-merchant', [
        stringAsciiCV('SpayBusiness'),
        uintCV(1000000) // 1 STX stake
    ], nonce++);
    await new Promise(r => setTimeout(r, 2000));

    // 3. Deposit to Vault
    await callContract('vault-deposit', [uintCV(500000)], nonce++);
    await new Promise(r => setTimeout(r, 2000));

    // 4. Process Payment
    await callContract('process-payment', [
        principalCV(contractAddress),
        uintCV(100000)
    ], nonce++);
    await new Promise(r => setTimeout(r, 2000));

    // 5. Merchant Withdraw
    await callContract('merchant-withdraw', [uintCV(50000)], nonce++);

    console.log('\n✅ All 5 interactions completed!');
}

run().catch(console.error);
