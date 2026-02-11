#!/usr/bin/env node
import { cvToJSON } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { callReadOnlyFunction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function getUserInfo(userAddress) {
    try {
        const result = await callReadOnlyFunction({
            network,
            contractAddress,
            contractName,
            functionName: "get-user-info",
            functionArgs: [userAddress],
            senderAddress: userAddress,
        });

        const json = cvToJSON(result);

        if (json.success) {
            const user = json.value;
            console.log("\n=== User Information ===");
            console.log(`Username: ${user.username}`);
            console.log(`Registered At: Block ${user['registered-at']}`);
            console.log(`Total Spent: ${user['total-spent']} STX`);
            console.log(`Total Received: ${user['total-received']} STX`);
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
    }
}

const address = process.argv[2];
if (!address) {
    console.log("Usage: node user-lookup.js <user-address>");
    process.exit(1);
}

getUserInfo(address);
