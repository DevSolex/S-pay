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
if (!privateKey) {
    throw new Error("PRIVATE_KEY not found in .env");
}

const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet'); 
console.log(`Deploying from address: ${address}`);

async function getNextNonce(addr) {
    console.log(`Fetching next nonce for ${addr}...`);
    const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${addr}/nonces`);
    const data = await response.json();
    return BigInt(data.possible_next_nonce);
}

async function deployContract(contractName, filePath, fee) {
    console.log(`Deploying ${contractName} with fee ${fee} microstacks...`);
    const contractContent = readFileSync(filePath, 'utf8');
    const nonce = await getNextNonce(address);

    const txOptions = {
        contractName,
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
    const response = await broadcastTransaction({ transaction, network });

    if (response.error) {
        console.error(`Deployment failed:`, response.error, response.reason);
        return null;
    }
    
    console.log(`Deployment successful!`);
    console.log(`Transaction ID: ${response.txid}`);
    console.log(`Explorer: https://explorer.hiro.so/txid/0x${response.txid}?chain=mainnet`);
    return response.txid;
}

deployContract('payer-token', 'contracts/payer-token.clar', 10000n).catch(console.error);
