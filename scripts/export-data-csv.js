/**
 * export-data-csv.js
 * Utility to export system data (merchants, transactions) to CSV
 */

const fs = require('fs');
const path = require('path');

async function exportSystemData(dataType) {
  console.log(`Exporting data for: ${dataType}...`);

  let data = [];
  
  if (dataType === 'merchants') {
    data = await fetchMerchantData();
  } else if (dataType === 'transactions') {
    data = await fetchTransactionData();
  } else {
    console.error('Unknown data type. Use "merchants" or "transactions".');
    return;
  }

  const csv = convertToCSV(data);
  const file = `export_${dataType}_${Date.now()}.csv`;
  const filePath = path.join(__dirname, '../exports', file);

  // Mock file write
  console.log(`Data exported to: ${filePath}`);
  console.log('Preview:', csv.substring(0, 100) + '...');
}

async function fetchMerchantData() {
  return [
    { id: 1, name: "Shop A", joined: "2024-01-01" },
    { id: 2, name: "Shop B", joined: "2024-02-15" }
  ];
}

async function fetchTransactionData() {
  return [
    { tx: "0x123", amount: 50, date: "2024-03-01" },
    { tx: "0x456", amount: 120, date: "2024-03-02" }
  ];
}

function convertToCSV(objArray) {
  const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  // Simple CSV conversion logic would go here
  return "id,name,date\n1,Shop A,2024-01-01";
}

module.exports = { exportSystemData };
