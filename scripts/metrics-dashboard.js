#!/usr/bin/env node
import { cvToJSON } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { callReadOnlyFunction } from "@stacks/transactions";
import fetch from "node-fetch";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function getMetricsDashboard() {
    try {
        // Get protocol status
        const statusResult = await callReadOnlyFunction({
            network,
            contractAddress,
            contractName,
            functionName: "get-protocol-status",
            functionArgs: [],
            senderAddress: contractAddress,
        });

        const status = cvToJSON(statusResult);

        // Get global metrics
        const metricsResult = await callReadOnlyFunction({
            network,
            contractAddress,
            contractName,
            functionName: "get-global-metrics",
            functionArgs: [],
            senderAddress: contractAddress,
        });

        const metrics = cvToJSON(metricsResult);

        console.log("\n╔════════════════════════════════════════╗");
        console.log("║       S-PAY METRICS DASHBOARD          ║");
        console.log("╚════════════════════════════════════════╝\n");

        if (status.success) {
            console.log("📊 Protocol Status:");
            console.log(`   Total Volume: ${status.value['total-volume']} STX`);
            console.log(`   Fees Collected: ${status.value['total-fees-collected']} STX`);
            console.log(`   Fee Rate: ${status.value['fee-percentage'] / 100}%`);
            console.log(`   Status: ${status.value.paused ? '⏸️  Paused' : '✅ Active'}`);
            console.log("");
        }

        if (metrics.success) {
            console.log("👥 User Metrics:");
            console.log(`   Total Users: ${metrics.value['total-users']}`);
            console.log(`   Total Merchants: ${metrics.value['total-merchants']}`);
            console.log(`   Verified Merchants: ${metrics.value['verified-merchants']}`);
            console.log("");
        }

        // Get recent transactions
        const apiUrl = `${network.coreApiUrl}/extended/v1/address/${contractAddress}.${contractName}/transactions?limit=10`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("📝 Recent Activity:");
        console.log(`   Last 10 Transactions: ${data.results.length}`);
        console.log(`   Latest Block: ${data.results[0]?.block_height || 'N/A'}`);
        console.log("");

    } catch (error) {
        console.error("Error fetching metrics:", error);
    }
}

getMetricsDashboard();
