import {
    makeContractDeploy,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;
import { readFileSync } from 'fs';
import 'dotenv/config';

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error("PRIVATE_KEY not found in .env");
}

const network = STACKS_MAINNET;

async function deployContract(contractName, filePath) {
    console.log(`Preparing deployment transaction for contract '${contractName}'...`);
    const contractContent = readFileSync(filePath, 'utf8');

    try {
        const txOptions = {
            contractName: contractName,
            codeBody: contractContent,
            senderKey: privateKey,
            network,
            anchorMode: AnchorMode.Any,
            fee: 100000n, // 0.1 STX fee
            postConditionMode: PostConditionMode.Allow,
            clarityVersion: 2,
        };

        const transaction = await makeContractDeploy(txOptions);
        console.log(`Broadcasting transaction for ${contractName}...`);
        const response = await broadcastTransaction({ transaction, network });

        if (response.error) {
            console.error(`Deployment of ${contractName} failed:`, response.error);
            if (response.reason) console.error("Reason:", response.reason);
            return null;
        } else {
            console.log(`Deployment of ${contractName} broadcast successfully!`);
            console.log("Transaction ID:", response.txid);
            return response.txid;
        }
    } catch (error) {
        console.error(`Error during deployment of ${contractName}:`, error);
        return null;
    }
}

async function runDeployments() {
    // 1. Deploy Trait
    const traitTxId = await deployContract('sip-010-trait', 'contracts/sip-010-trait.clar');
    if (!traitTxId) return;

    // 2. Deploy Token
    // We might need to wait for the trait to be confirmed or at least in the mempool 
    // for the token to be valid. In some cases, we might need a brief delay.
    console.log("Waiting 5 seconds before broadcasting token deployment...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    const tokenTxId = await deployContract('s-pay-token', 'contracts/s-pay-token.clar');
    if (tokenTxId) {
        console.log("\nAll deployments broadcast!");
        console.log(`Trait Tx: https://explorer.hiro.so/txid/0x${traitTxId}?chain=mainnet`);
        console.log(`Token Tx: https://explorer.hiro.so/txid/0x${tokenTxId}?chain=mainnet`);
    }
}

runDeployments().catch(console.error);
