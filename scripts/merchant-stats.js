#!/usr/bin/env node
import { cvToJSON } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { callReadOnlyFunction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function getMerchantStats(merchantAddress) {
    try {
        const result = await callReadOnlyFunction({
            network,
            contractAddress,
            contractName,
            functionName: "get-merchant-info",
            functionArgs: [merchantAddress],
            senderAddress: merchantAddress,
        });

        const json = cvToJSON(result);

        if (json.success) {
            const merchant = json.value;
            console.log("\n=== Merchant Statistics ===");
            console.log(`Business Name: ${merchant['business-name']}`);
            console.log(`Website: ${merchant.website}`);
            console.log(`Status: ${merchant.status}`);
            console.log(`Tier: ${merchant.tier}`);
            console.log(`Total Volume: ${merchant['total-volume']} STX`);
            console.log(`Verification Stake: ${merchant['verification-stake']} STX`);
        } else {
            console.log("Merchant not found");
        }
    } catch (error) {
        console.error("Error fetching merchant stats:", error);
    }
}

const address = process.argv[2];
if (!address) {
    console.log("Usage: node merchant-stats.js <merchant-address>");
    process.exit(1);
}

getMerchantStats(address);
