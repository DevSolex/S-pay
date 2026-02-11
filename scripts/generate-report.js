#!/usr/bin/env node
import { writeFileSync } from "fs";
import { StacksMainnet } from "@stacks/network";
import fetch from "node-fetch";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function generateReport() {
  const timestamp = new Date().toISOString();
  
  console.log("\n=== Generating Contract Report ===\n");
  
  try {
    // Get contract info
    const infoUrl = `${network.coreApiUrl}/v2/contracts/interface/${contractAddress}/${contractName}`;
    const infoResponse = await fetch(infoUrl);
    const contractInfo = await infoResponse.json();
    
    // Get recent transactions
    const txUrl = `${network.coreApiUrl}/extended/v1/address/${contractAddress}.${contractName}/transactions?limit=50`;
    const txResponse = await fetch(txUrl);
    const txData = await txResponse.json();
    
    const report = {
      generated: timestamp,
      contract: {
        address: contractAddress,
        name: contractName,
        functions: contractInfo.functions?.length || 0,
      },
      activity: {
        totalTransactions: txData.total,
        recentTransactions: txData.results.length,
        lastActivity: txData.results[0]?.block_height || "N/A",
      },
    };
    
    const filename = `report-${timestamp.replace(/:/g, "-")}.json`;
    writeFileSync(filename, JSON.stringify(report, null, 2));
    
    console.log("✓ Report generated successfully");
    console.log(`  File: ${filename}\n`);
    
    console.log("📊 Summary:");
    console.log(`   Contract Functions: ${report.contract.functions}`);
    console.log(`   Total Transactions: ${report.activity.totalTransactions}`);
    console.log(`   Last Activity: Block ${report.activity.lastActivity}\n`);
    
  } catch (error) {
    console.error("Error generating report:", error);
  }
}

generateReport();
