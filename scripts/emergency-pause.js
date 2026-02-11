#!/usr/bin/env node
import { Cl } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { makeContractCall, broadcastTransaction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function pauseContract() {
  const privateKey = process.env.PRIVATE_KEY;
  
  if (!privateKey) {
    console.error("PRIVATE_KEY not found in environment");
    process.exit(1);
  }
  
  console.log("\n⚠️  EMERGENCY PAUSE ⚠️\n");
  console.log("This will pause all contract operations.");
  console.log("Are you sure? (This script will execute in 5 seconds)\n");
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  try {
    const txOptions = {
      contractAddress,
      contractName,
      functionName: "pause-contract",
      functionArgs: [],
      senderKey: privateKey,
      network,
      postConditionMode: 1,
    };
    
    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction, network });
    
    console.log("✓ Contract paused successfully");
    console.log(`  TX: ${response.txid}\n`);
  } catch (error) {
    console.error("✗ Failed to pause contract:", error.message);
  }
}

pauseContract();
