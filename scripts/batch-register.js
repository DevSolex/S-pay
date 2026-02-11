#!/usr/bin/env node
import { Cl } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { makeContractCall, broadcastTransaction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function batchRegisterUsers(users) {
  const privateKey = process.env.PRIVATE_KEY;
  
  if (!privateKey) {
    console.error("PRIVATE_KEY not found in environment");
    process.exit(1);
  }
  
  console.log(`\n=== Batch User Registration ===`);
  console.log(`Registering ${users.length} users\n`);
  
  for (const username of users) {
    try {
      const txOptions = {
        contractAddress,
        contractName,
        functionName: "register-user",
        functionArgs: [Cl.stringAscii(username)],
        senderKey: privateKey,
        network,
        postConditionMode: 1,
      };
      
      const transaction = await makeContractCall(txOptions);
      const response = await broadcastTransaction({ transaction, network });
      
      console.log(`✓ Registered user: ${username}`);
      console.log(`  TX: ${response.txid}\n`);
      
      // Wait 1 second between transactions
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Failed to register ${username}:`, error.message);
    }
  }
}

const users = process.argv.slice(2);

if (users.length === 0) {
  console.log("Usage: node batch-register.js <username1> <username2> ...");
  process.exit(1);
}

batchRegisterUsers(users);
