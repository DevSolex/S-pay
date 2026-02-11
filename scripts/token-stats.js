#!/usr/bin/env node
import { cvToJSON } from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { callReadOnlyFunction } from "@stacks/transactions";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const tokenContractName = "s-pay-token";

async function getTokenStats() {
  try {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║       SPAY TOKEN STATISTICS            ║");
    console.log("╚════════════════════════════════════════╝\n");
    
    // Get total supply
    const supplyResult = await callReadOnlyFunction({
      network,
      contractAddress,
      contractName: tokenContractName,
      functionName: "get-total-supply",
      functionArgs: [],
      senderAddress: contractAddress,
    });
    
    const supply = cvToJSON(supplyResult);
    console.log("📊 Supply Metrics:");
    console.log(`   Total Supply: ${supply.value} SPAY`);
    console.log("");
    
    // Get token metadata
    const nameResult = await callReadOnlyFunction({
      network,
      contractAddress,
      contractName: tokenContractName,
      functionName: "get-name",
      functionArgs: [],
      senderAddress: contractAddress,
    });
    
    const name = cvToJSON(nameResult);
    console.log("ℹ️  Token Info:");
    console.log(`   Name: ${name.value}`);
    
    const symbolResult = await callReadOnlyFunction({
      network,
      contractAddress,
      contractName: tokenContractName,
      functionName: "get-symbol",
      functionArgs: [],
      senderAddress: contractAddress,
    });
    
    const symbol = cvToJSON(symbolResult);
    console.log(`   Symbol: ${symbol.value}`);
    
    const decimalsResult = await callReadOnlyFunction({
      network,
      contractAddress,
      contractName: tokenContractName,
      functionName: "get-decimals",
      functionArgs: [],
      senderAddress: contractAddress,
    });
    
    const decimals = cvToJSON(decimalsResult);
    console.log(`   Decimals: ${decimals.value}`);
    console.log("");
    
  } catch (error) {
    console.error("Error fetching token stats:", error);
  }
}

getTokenStats();
