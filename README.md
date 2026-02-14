# S-pay

S-pay is a premium, decentralized payment gateway built on the Stacks blockchain. It enables merchants to accept Bitcoin and various SIP-010 tokens with a seamless, high-performance experience.

## Features

- **Stacks Mainnet Native**: Built directly on the Bitcoin layer for maximum security and decentralization.
- **Multi-Token Support**: Support for BTC, ETH, USDC, and many other V2 tokens.
- **Premium Dashboard**: A state-of-the-art merchant dashboard with glassmorphism design.
- **Wallet Integration**: Native support for Xverse, Leather, and other Stacks-compatible wallets.
- **Real-time Monitoring**: Track payments and transaction statuses in real-time.

## Project Structure

- `contracts/`: Clarity smart contracts for the S-pay protocol and tokens.
- `frontend/`: Next.js merchant dashboard.
- `scripts/`: Utility scripts for deployment and contract interaction.
- `tests/`: Vitest and Clarinet test suites.

## Getting Started

### Prerequisites

- Node.js (v18+)
- Clarinet (for contract development)
- A Stacks wallet (Mainnet)

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.template .env
   ```

### Running the Frontend

```bash
cd frontend
npm run dev
```

## Deployment

Deploy contracts using the provided deployment scripts:
```bash
node deploy.js
```

## License

MIT
Simplified Payments on Stacks
