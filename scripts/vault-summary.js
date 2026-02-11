#!/usr/bin/env node
import { cvToJSON } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { callReadOnlyFunction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function getVaultSummary() {
    try {
        const result = await callReadOnlyFunction({
            network,
            contractAddress,
            contractName,
            functionName: "get-protocol-status",
            functionArgs: [],
            senderAddress: contractAddress,
        });

        const json = cvToJSON(result);

        if (json.success) {
            const status = json.value;
            console.log("\n=== Vault Summary ===");
            console.log(`Total Volume: ${status['total-volume']} STX`);
            console.log(`Total Fees Collected: ${status['total-fees-collected']} STX`);
            console.log(`Fee Percentage: ${status['fee-percentage'] / 100}%`);
            console.log(`Contract Paused: ${status.paused}`);
            console.log(`Require Verification: ${status['require-verification']}`);
            console.log(`Owner: ${status.owner}`);
            console.log(`Version: ${status.version}`);
        }
    } catch (error) {
        console.error("Error fetching vault summary:", error);
    }
}

getVaultSummary();
