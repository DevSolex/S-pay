#!/usr/bin/env node
import { StacksMainnet } from "@stacks/network";
import fetch from "node-fetch";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function getPaymentHistory(address, limit = 50) {
    try {
        const apiUrl = `${network.coreApiUrl}/extended/v1/address/${address}/transactions?limit=${limit}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const payments = data.results.filter(tx =>
            tx.tx_type === "contract_call" &&
            tx.contract_call?.contract_id === `${contractAddress}.${contractName}` &&
            tx.contract_call?.function_name === "process-payment"
        );

        console.log(`\n=== Payment History for ${address} ===`);
        console.log(`Total Payments: ${payments.length}\n`);

        payments.forEach((payment, index) => {
            console.log(`Payment #${index + 1}:`);
            console.log(`  TX ID: ${payment.tx_id}`);
            console.log(`  Status: ${payment.tx_status}`);
            console.log(`  Block: ${payment.block_height}`);
            console.log(`  Fee: ${payment.fee_rate} STX`);
            console.log("");
        });
    } catch (error) {
        console.error("Error fetching payment history:", error);
    }
}

const address = process.argv[2];
const limit = parseInt(process.argv[3]) || 50;

if (!address) {
    console.log("Usage: node payment-history.js <address> [limit]");
    process.exit(1);
}

getPaymentHistory(address, limit);
