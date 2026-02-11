#!/usr/bin/env node
import { StacksMainnet } from "@stacks/network";
import fetch from "node-fetch";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function monitorContract() {
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║       CONTRACT HEALTH MONITOR          ║");
  console.log("╚════════════════════════════════════════╝\n");
  
  try {
    // Check contract exists
    const infoUrl = `${network.coreApiUrl}/v2/contracts/interface/${contractAddress}/${contractName}`;
    const infoResponse = await fetch(infoUrl);
    
    if (infoResponse.ok) {
      console.log("✅ Contract Status: Active");
    } else {
      console.log("❌ Contract Status: Not Found");
      return;
    }
    
    // Check recent activity
    const txUrl = `${network.coreApiUrl}/extended/v1/address/${contractAddress}.${contractName}/transactions?limit=10`;
    const txResponse = await fetch(txUrl);
    const txData = await txResponse.json();
    
    const recentTx = txData.results[0];
    if (recentTx) {
      const timeSinceLastTx = Date.now() - new Date(recentTx.burn_block_time_iso).getTime();
      const hoursSince = Math.floor(timeSinceLastTx / (1000 * 60 * 60));
      
      console.log(`📊 Recent Activity: ${hoursSince} hours ago`);
      console.log(`📝 Total Transactions: ${txData.total}`);
    } else {
      console.log("📊 Recent Activity: No transactions");
    }
    
    // Check network status
    const statusUrl = `${network.coreApiUrl}/extended/v1/status`;
    const statusResponse = await fetch(statusUrl);
    const statusData = await statusResponse.json();
    
    console.log(`⛓️  Network: ${statusData.network_id === 1 ? "Mainnet" : "Testnet"}`);
    console.log(`🔗 Chain Tip: Block ${statusData.chain_tip?.block_height || "Unknown"}`);
    
    console.log("\n✅ All systems operational\n");
    
  } catch (error) {
    console.error("\n❌ Health check failed:", error.message, "\n");
  }
}

monitorContract();
