/**
 * interact-50tx.js
 * Performs 50 transactions with the deployed s-pay-v1 contract
 */

import {
    makeContractCall,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    getAddressFromPrivateKey,
    standardPrincipalCV,
    uintCV,
    stringAsciiCV,
    boolCV
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;
import 'dotenv/config';

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error("PRIVATE_KEY not found in .env");
}

const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet');
const contractAddress = 'SP2DBFGMT7SATSJPCCA38SDDPBNNQ86QWADJ3E6WT';
const contractName = 's-pay-v1';

console.log(`Interacting from address: ${address}`);
console.log(`Target contract: ${contractAddress}.${contractName}\n`);

async function getNextNonce(addr) {
    try {
        const response = await fetch(`https://api.mainnet.hiro.so/v2/accounts/${addr}?proof=0`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return BigInt(data.nonce);
    } catch (error) {
        console.error("Error fetching nonce:", error);
        throw error;
    }
}

async function callContractFunction(functionName, functionArgs, nonce, fee = 20000n) {
    console.log(`[${nonce}] Calling ${functionName}...`);
    
    try {
        const txOptions = {
            contractAddress,
            contractName,
            functionName,
            functionArgs,
            senderKey: privateKey,
            network,
            anchorMode: AnchorMode.Any,
            fee,
            nonce,
            postConditionMode: PostConditionMode.Allow,
        };

        const transaction = await makeContractCall(txOptions);
        const response = await broadcastTransaction({ transaction, network });

        if (response.error) {
            console.error(`  ❌ ${functionName} failed:`, response.error);
            if (response.reason) console.error(`     Reason: ${response.reason}`);
            return null;
        } else {
            console.log(`  ✅ ${functionName} broadcast! TxID: ${response.txid.substring(0, 16)}...`);
            return response.txid;
        }
    } catch (error) {
        console.error(`  ❌ Error calling ${functionName}:`, error.message);
        return null;
    }
}

async function run50Transactions() {
    let currentNonce = await getNextNonce(address);
    console.log(`Starting with nonce: ${currentNonce}\n`);
    console.log('='.repeat(60));

    const transactions = [];
    let successCount = 0;

    // Transaction 1-5: Vault deposits with varying amounts
    for (let i = 0; i < 5; i++) {
        const amount = uintCV(1000000 + (i * 100000)); // 1-1.4 STX
        const txid = await callContractFunction('vault-deposit', [amount], currentNonce, 20000n);
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: 'vault-deposit', txid, nonce: currentNonce - 1n });
        await sleep(200);
    }

    // Transaction 6-10: Get protocol status (read-only, but we'll call as tx for volume)
    for (let i = 0; i < 5; i++) {
        const amount = uintCV(500000); // 0.5 STX
        const txid = await callContractFunction('vault-deposit', [amount], currentNonce, 20000n);
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: 'vault-deposit-small', txid, nonce: currentNonce - 1n });
        await sleep(200);
    }

    // Transaction 11-15: Vault withdrawals
    for (let i = 0; i < 5; i++) {
        const amount = uintCV(300000); // 0.3 STX
        const txid = await callContractFunction('vault-withdraw', [amount], currentNonce, 20000n);
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: 'vault-withdraw', txid, nonce: currentNonce - 1n });
        await sleep(200);
    }

    // Transaction 16-25: Process payments to various addresses
    const recipients = [
        'SP2DBFGMT7SATSJPCCA38SDDPBNNQ86QWADJ3E6WT',
        'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE',
        'SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS',
        'SPAXYA5XS51713FDTQ8H94EJ4V579CXMTRNBZKSF',
        'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7'
    ];
    
    for (let i = 0; i < 10; i++) {
        const amount = uintCV(2000000 + (i * 50000)); // 2-2.45 STX
        const recipient = standardPrincipalCV(recipients[i % recipients.length]);
        const txid = await callContractFunction('process-payment', [amount, recipient], currentNonce, 20000n);
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: 'process-payment', txid, nonce: currentNonce - 1n });
        await sleep(300);
    }

    // Transaction 26-30: More vault deposits
    for (let i = 0; i < 5; i++) {
        const amount = uintCV(800000 + (i * 50000)); // 0.8-1 STX
        const txid = await callContractFunction('vault-deposit', [amount], currentNonce, 20000n);
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: 'vault-deposit-mid', txid, nonce: currentNonce - 1n });
        await sleep(200);
    }

    // Transaction 31-35: Update user profiles (if registered)
    for (let i = 0; i < 5; i++) {
        const bio = stringAsciiCV(`Bio update ${i + 1}`);
        const website = stringAsciiCV(`https://example${i}.com`);
        const avatar = stringAsciiCV(`https://avatar${i}.com/pic.jpg`);
        const notifications = boolCV(true);
        const currency = stringAsciiCV("STX");
        
        const txid = await callContractFunction(
            'update-user-profile',
            [bio, website, avatar, notifications, currency],
            currentNonce,
            20000n
        );
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: 'update-profile', txid, nonce: currentNonce - 1n });
        await sleep(200);
    }

    // Transaction 36-40: More payments
    for (let i = 0; i < 5; i++) {
        const amount = uintCV(1500000 + (i * 100000)); // 1.5-1.9 STX
        const recipient = standardPrincipalCV(recipients[i % recipients.length]);
        const txid = await callContractFunction('process-payment', [amount, recipient], currentNonce, 20000n);
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: 'process-payment-2', txid, nonce: currentNonce - 1n });
        await sleep(300);
    }

    // Transaction 41-45: Vault operations
    for (let i = 0; i < 5; i++) {
        const isDeposit = i % 2 === 0;
        const amount = uintCV(400000 + (i * 50000)); // 0.4-0.6 STX
        const functionName = isDeposit ? 'vault-deposit' : 'vault-withdraw';
        
        const txid = await callContractFunction(functionName, [amount], currentNonce, 20000n);
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: functionName, txid, nonce: currentNonce - 1n });
        await sleep(200);
    }

    // Transaction 46-50: Final batch of payments
    for (let i = 0; i < 5; i++) {
        const amount = uintCV(3000000 + (i * 100000)); // 3-3.4 STX
        const recipient = standardPrincipalCV(recipients[i % recipients.length]);
        const txid = await callContractFunction('process-payment', [amount, recipient], currentNonce, 20000n);
        if (txid) {
            successCount++;
            currentNonce++;
        }
        transactions.push({ type: 'process-payment-final', txid, nonce: currentNonce - 1n });
        await sleep(300);
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n✨ Transaction Batch Complete!`);
    console.log(`   Total Attempted: 50`);
    console.log(`   Successful: ${successCount}`);
    console.log(`   Failed: ${50 - successCount}`);
    console.log(`   Final Nonce: ${currentNonce}\n`);

    // Display summary
    const summary = transactions.reduce((acc, tx) => {
        acc[tx.type] = (acc[tx.type] || 0) + 1;
        return acc;
    }, {});

    console.log('Transaction Summary by Type:');
    Object.entries(summary).forEach(([type, count]) => {
        console.log(`  ${type}: ${count}`);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

run50Transactions().catch(console.error);
