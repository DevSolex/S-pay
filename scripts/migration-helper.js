#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";

console.log("\n=== S-pay Migration Helper ===\n");

const oldConfig = process.argv[2];
const newConfig = process.argv[3];

if (!oldConfig || !newConfig) {
    console.log("Usage: node migration-helper.js <old-config.json> <new-config.json>");
    console.log("\nThis tool helps migrate contract configurations between deployments.");
    process.exit(1);
}

try {
    const oldData = JSON.parse(readFileSync(oldConfig, 'utf8'));
    const newData = JSON.parse(readFileSync(newConfig, 'utf8'));

    console.log("📋 Migration Plan:");
    console.log(`   From: ${oldData.contractAddress || 'Unknown'}`);
    console.log(`   To: ${newData.contractAddress || 'Unknown'}`);
    console.log("");

    // Generate migration script
    const migrationSteps = [];

    if (oldData.feePercentage !== newData.feePercentage) {
        migrationSteps.push({
            action: "set-fee-percentage",
            value: newData.feePercentage
        });
    }

    if (oldData.feeReceiver !== newData.feeReceiver) {
        migrationSteps.push({
            action: "set-fee-receiver",
            value: newData.feeReceiver
        });
    }

    console.log("🔧 Migration Steps:");
    migrationSteps.forEach((step, i) => {
        console.log(`   ${i + 1}. ${step.action}: ${step.value}`);
    });

    writeFileSync('migration-plan.json', JSON.stringify(migrationSteps, null, 2));
    console.log("\n✅ Migration plan saved to migration-plan.json\n");

} catch (error) {
    console.error("Error during migration:", error);
}
