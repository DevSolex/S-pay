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
const contractContent = readFileSync('contracts/s-pay.clar', 'utf8');

async function deploy() {
    console.log("Preparing deployment transaction for contract 's-pay'...");

    try {
        const txOptions = {
            contractName: 's-pay',
            codeBody: contractContent,
            senderKey: privateKey,
            network,
            anchorMode: AnchorMode.Any,
            fee: 100000n, // 0.1 STX fee
            postConditionMode: PostConditionMode.Allow,
            clarityVersion: 2,
        };

        const transaction = await makeContractDeploy(txOptions);
        console.log("Broadcasting transaction...");
        const response = await broadcastTransaction({ transaction, network });

        if (response.error) {
            console.error("Deployment failed:", response.error);
            if (response.reason) console.error("Reason:", response.reason);
            if (response.message) console.error("Message:", response.message);
        } else {
            console.log("Deployment transaction broadcast successfully!");
            console.log("Transaction ID:", response.txid);
            console.log(`Explorer: https://explorer.hiro.so/txid/0x${response.txid}?chain=mainnet`);
        }
    } catch (error) {
        console.error("Error during deployment:", error);
    }
}

deploy().catch(console.error);
