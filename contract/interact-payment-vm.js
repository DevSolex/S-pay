import {
    makeContractCall,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    stringAsciiCV,
    uintCV,
    principalCV,
    getAddressFromPrivateKey
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
const contractAddress = 'SP2DBFGMT7SATSJPCCA38SDDPBNNQ86QWADJ3E6WT';
const contractName = 'payment-vm';

async function getNonce() {
    const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/nonces`);
    const data = await response.json();
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
        postConditionMode: PostConditionMode.Allow,
        fee: 50000n,
        nonce
    };

    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction, network });
    
    if (response.error) {
        console.log(`❌ ${functionName} failed:`, response.reason || response.error);
        return null;
    }
    console.log(`✅ ${functionName}: ${response.txid}`);
    return response.txid;
}

async function run() {
    let nonce = await getNonce();
    console.log(`Starting from nonce: ${nonce}\n`);

    // 1. Register user
    await callContract('register-user', [stringAsciiCV('alice')], nonce++);
    
    // 2. Register another user
    await callContract('register-user', [stringAsciiCV('bob')], nonce++);
    
    // 3. Register merchant
    await callContract('register-merchant', [
        stringAsciiCV('AliceShop'),
        stringAsciiCV('https://aliceshop.com')
    ], nonce++);
    
    // 4. Update user profile
    await callContract('update-user-profile', [
        stringAsciiCV('Crypto enthusiast'),
        stringAsciiCV('https://alice.com'),
        stringAsciiCV('https://avatar.com/alice.png')
    ], nonce++);
    
    // 5. Vault deposit
    await callContract('vault-deposit', [uintCV(1000000)], nonce++);
    
    // 6. Process payment
    await callContract('process-payment', [
        uintCV(50000),
        principalCV(contractAddress)
    ], nonce++);
    
    // 7. Another payment
    await callContract('process-payment', [
        uintCV(75000),
        principalCV(contractAddress)
    ], nonce++);
    
    // 8. Vault withdraw
    await callContract('vault-withdraw', [uintCV(100000)], nonce++);
    
    // 9. Register third user
    await callContract('register-user', [stringAsciiCV('charlie')], nonce++);
    
    // 10. Another merchant registration
    await callContract('register-merchant', [
        stringAsciiCV('BobStore'),
        stringAsciiCV('https://bobstore.io')
    ], nonce++);

    console.log('\n✨ All 10 transactions broadcast!');
}

run().catch(console.error);
