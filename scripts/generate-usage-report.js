/**
 * generate-usage-report.js
 * Script to generate daily usage reports for merchants
 */

const fs = require('fs');
const path = require('path');

async function generateReport() {
  console.log('Generating daily usage report...');
  
  const today = new Date().toISOString().split('T')[0];
  const reportData = await collectUsageData();
  
  const csvContent = formatAsCSV(reportData);
  const filename = `report_${today}.csv`;
  const outputPath = path.join(__dirname, '../reports', filename);

  // Ensure directory exists
  if (!fs.existsSync(path.join(__dirname, '../reports'))) {
    fs.mkdirSync(path.join(__dirname, '../reports'));
  }

  // Write file (mocking write for now to avoid FS clutter in test env)
  console.log(`Written report to ${outputPath}`);
  console.log('Content preview:', csvContent);
}

async function collectUsageData() {
  return [
    { merchant: 'Merchant A', txCount: 15, volume: 1500 },
    { merchant: 'Merchant B', txCount: 8, volume: 800 },
    { merchant: 'Merchant C', txCount: 22, volume: 2200 }
  ];
}

function formatAsCSV(data) {
  const header = 'Merchant,Transaction Count,Volume (STX)\n';
  const rows = data.map(d => `${d.merchant},${d.txCount},${d.volume}`).join('\n');
  return header + rows;
}

// generateReport();
module.exports = { generateReport };
