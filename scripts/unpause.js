#!/usr/bin/env node
import { Cl } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { makeContractCall, broadcastTransaction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function unpauseContract() {
  const privateKey = process.env.PRIVATE_KEY;
  
  if (!privateKey) {
    console.error("PRIVATE_KEY not found in environment");
    process.exit(1);
  }
  
  console.log("\n✅ UNPAUSE CONTRACT ✅\n");
  console.log("This will resume all contract operations.");
  console.log("Executing in 3 seconds...\n");
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    const txOptions = {
      contractAddress,
      contractName,
      functionName: "unpause-contract",
      functionArgs: [],
      senderKey: privateKey,
      network,
      postConditionMode: 1,
    };
    
    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction({ transaction, network });
    
    console.log("✓ Contract unpaused successfully");
    console.log(`  TX: ${response.txid}\n`);
  } catch (error) {
    console.error("✗ Failed to unpause contract:", error.message);
  }
}

unpauseContract();
