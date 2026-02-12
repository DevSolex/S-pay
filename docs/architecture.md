# S-pay System Architecture

## Overview
S-pay is a decentralized payment gateway built on the Stacks blockchain. It enables merchants to accept STX and SIP-010 tokens with minimal friction.

## Core Components

### 1. Smart Contracts
The core logic resides in Clarity smart contracts deployed on Stacks.
- **s-pay-token.clar**: The main token contract (if applicable) or the payment logic.
- **merchant-registry.clar**: managing merchant identities and payment destinations.
- **payment-router.clar**: routing payments between payers and merchants.

### 2. Frontend Application
A React-based dashboard for merchants to:
- Generate payment links.
- View transaction history.
- Manage their account settings.

### 3. Backend Services
- **Event Listener**: A Node.js service that listens for contract events to update the database.
- **API Server**: Provides data to the frontend that isn't directly queryable efficiently from the chain.

## Data Flow
1. **User initiates payment**: The user signs a transaction on the frontend.
2. **Contract execution**: The smart contract verifies the payment and transfers funds.
3. **Event emission**: The contract emits a `payment-successful` event.
4. **Event indexing**: The backend indexer picks up the event and updates the merchant's dashboard.
5. **Confirmation**: The user receives a confirmation on the frontend.

## Security Considerations
- **Non-custodial**: S-pay does not hold user funds.
- **Audited contracts**: All smart contracts undergo security audits.
- **Secure communication**: All backend communication is encrypted.

## Future Roadmap
- Support for detailed invoicing.
- Recurring payments (subscriptions).
- Cross-chain bridge integration.
