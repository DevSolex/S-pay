#!/usr/bin/env node
import { cvToJSON, Cl } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { makeContractCall, broadcastTransaction } from "@stacks/transactions";
import { readFileSync } from "fs";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const tokenContractName = "s-pay-token";

async function distributeTokens(recipients, amounts) {
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
        console.error("PRIVATE_KEY not found in environment");
        process.exit(1);
    }

    if (recipients.length !== amounts.length) {
        console.error("Recipients and amounts arrays must have same length");
        process.exit(1);
    }

    console.log(`\n=== Token Distribution ===`);
    console.log(`Distributing to ${recipients.length} recipients\n`);

    for (let i = 0; i < recipients.length; i++) {
        try {
            const txOptions = {
                contractAddress,
                contractName: tokenContractName,
                functionName: "mint",
                functionArgs: [Cl.uint(amounts[i]), Cl.principal(recipients[i])],
                senderKey: privateKey,
                network,
                postConditionMode: 1,
            };

            const transaction = await makeContractCall(txOptions);
            const response = await broadcastTransaction({ transaction, network });

            console.log(`✓ Sent ${amounts[i]} tokens to ${recipients[i]}`);
            console.log(`  TX: ${response.txid}\n`);
        } catch (error) {
            console.error(`✗ Failed to send to ${recipients[i]}:`, error.message);
        }
    }
}

// Example usage
const recipients = process.argv[2] ? JSON.parse(readFileSync(process.argv[2], 'utf8')).recipients : [];
const amounts = process.argv[2] ? JSON.parse(readFileSync(process.argv[2], 'utf8')).amounts : [];

if (recipients.length === 0) {
    console.log("Usage: node token-distribution.js <config.json>");
    console.log("\nConfig format:");
    console.log(JSON.stringify({
        recipients: ["SP...", "SP..."],
        amounts: [1000000, 2000000]
    }, null, 2));
    process.exit(1);
}

distributeTokens(recipients, amounts);
