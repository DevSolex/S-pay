#!/usr/bin/env node
import { Cl } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { makeContractCall, broadcastTransaction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function verifyMerchant(merchantAddress) {
  const privateKey = process.env.PRIVATE_KEY;
  
  if (!privateKey) {
    console.error("PRIVATE_KEY not found in environment");
    process.exit(1);
  }
  
  console.log(`\n=== Verify Merchant ===`);
  console.log(`Merchant: ${merchantAddress}\n`);
  
  try {
    const txOptions = {
      contractAddress,
      contractName,
      functionName: "verify-merchant",
      functionArgs: [Cl.principal(merchantAddress)],
      senderKey: privateKey,
      network,
      postConditionMode: 1,
    };
    
    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction, network });
    
    console.log("✓ Merchant verified successfully");
    console.log(`  TX: ${response.txid}\n`);
  } catch (error) {
    console.error("✗ Failed to verify merchant:", error.message);
  }
}

const merchantAddress = process.argv[2];

if (!merchantAddress || !merchantAddress.startsWith("SP")) {
  console.log("Usage: node verify-merchant.js <merchant-address>");
  console.log("Example: node verify-merchant.js SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9");
  process.exit(1);
}

verifyMerchant(merchantAddress);
