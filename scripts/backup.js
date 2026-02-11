#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { StacksMainnet } from "@stacks/network";
import fetch from "node-fetch";

const network = new StacksMainnet();
const contractAddress = process.env.CONTRACT_ADDRESS || "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "s-pay";

async function backupContractData() {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupDir = `./backups/${timestamp}`;

    if (!existsSync('./backups')) {
        mkdirSync('./backups');
    }
    mkdirSync(backupDir);

    console.log(`\n=== Backing up contract data ===`);
    console.log(`Backup directory: ${backupDir}\n`);

    try {
        // Backup transactions
        const txUrl = `${network.coreApiUrl}/extended/v1/address/${contractAddress}.${contractName}/transactions?limit=200`;
        const txResponse = await fetch(txUrl);
        const txData = await txResponse.json();

        writeFileSync(`${backupDir}/transactions.json`, JSON.stringify(txData, null, 2));
        console.log(`✓ Backed up ${txData.results.length} transactions`);

        // Backup contract info
        const infoUrl = `${network.coreApiUrl}/v2/contracts/interface/${contractAddress}/${contractName}`;
        const infoResponse = await fetch(infoUrl);
        const infoData = await infoResponse.json();

        writeFileSync(`${backupDir}/contract-info.json`, JSON.stringify(infoData, null, 2));
        console.log(`✓ Backed up contract interface`);

        // Backup events
        const eventsUrl = `${network.coreApiUrl}/extended/v1/contract/${contractAddress}.${contractName}/events?limit=200`;
        const eventsResponse = await fetch(eventsUrl);
        const eventsData = await eventsResponse.json();

        writeFileSync(`${backupDir}/events.json`, JSON.stringify(eventsData, null, 2));
        console.log(`✓ Backed up ${eventsData.results?.length || 0} events`);

        console.log(`\n✅ Backup completed successfully!`);
        console.log(`Location: ${backupDir}\n`);

    } catch (error) {
        console.error("Error during backup:", error);
    }
}

backupContractData();
