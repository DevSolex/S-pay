/**
 * monitor-contract-events.js
 * Script to listen for and log Stacks contract events
 */

const { StacksMainnet } = require('@stacks/network');
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');

async function monitorEvents() {
  const client = await connectWebSocketClient('ws://localhost:3999');
  
  console.log('Monitoring contract events for S-Pay...');

  await client.subscribeAddressTransactions(
    'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5.s-pay-token', 
    (event) => {
      console.log('------------------------------------------------');
      console.log('New Transaction Detected:');
      console.log(`TxID: ${event.tx_id}`);
      console.log(`Status: ${event.tx_status}`);
      console.log(`Block Height: ${event.block_height}`);
      
      if (event.tx_status === 'success') {
        processTransaction(event);
      }
    }
  );
}

function processTransaction(event) {
  // Logic to update internal database or notify user
  const details = {
    timestamp: new Date().toISOString(),
    event: event
  };
  // Simplified logging for demonstration
  console.log('Processing transaction:', JSON.stringify(details, null, 2));
}

// monitorEvents(); // Commented out to prevent blocking execution during CI
module.exports = { monitorEvents };
