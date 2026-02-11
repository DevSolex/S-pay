#!/usr/bin/env node
import { Cl } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { makeContractCall, broadcastTransaction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function setFeePercentage(percentage) {
  const privateKey = process.env.PRIVATE_KEY;
  
  if (!privateKey) {
    console.error("PRIVATE_KEY not found in environment");
    process.exit(1);
  }
  
  console.log(`\n=== Update Fee Percentage ===`);
  console.log(`New fee: ${percentage / 100}%\n`);
  
  try {
    const txOptions = {
      contractAddress,
      contractName,
      functionName: "set-fee-percentage",
      functionArgs: [Cl.uint(percentage)],
      senderKey: privateKey,
      network,
      postConditionMode: 1,
    };
    
    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction, network });
    
    console.log("✓ Fee percentage updated successfully");
    console.log(`  TX: ${response.txid}\n`);
  } catch (error) {
    console.error("✗ Failed to update fee:", error.message);
  }
}

const percentage = parseInt(process.argv[2]);

if (!percentage || percentage < 0 || percentage > 1000) {
  console.log("Usage: node set-fee.js <percentage>");
  console.log("Example: node set-fee.js 200 (for 2%)");
  console.log("Note: Percentage in basis points (200 = 2%)");
  process.exit(1);
}

setFeePercentage(percentage);
