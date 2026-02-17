# S-pay

S-pay is a premium, decentralized payment gateway built on the Stacks blockchain. It enables merchants to accept Bitcoin and various SIP-010 tokens with a seamless, high-performance experience.

## Features

- **Stacks Mainnet Native**: Built directly on the Bitcoin layer for maximum security and decentralization.
- **Multi-Token Support**: Support for BTC, ETH, USDC, and many other V2 tokens.
- **Premium Dashboard**: A state-of-the-art merchant dashboard with glassmorphism design.
- **Wallet Integration**: Native support for Xverse, Leather, and other Stacks-compatible wallets.
- **Real-time Monitoring**: Track payments and transaction statuses in real-time.

## Project Structure

```
S-pay/
├── contract/     # Clarity contracts, tests, deploy scripts
│   ├── contracts/
│   ├── scripts/
│   ├── tests/
│   └── deploy.js
└── frontend/     # Next.js merchant dashboard
```

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   cd contract && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables (at root):
   ```bash
   cp .env.template .env
   ```

### Running the Frontend

```bash
npm run dev
```
Or: `cd frontend && npm run dev`

### Contract Commands

```bash
npm run deploy    # Deploy to mainnet
npm run check     # Verify contracts (clarinet check)
npm run test      # Run contract tests
```

## License

MIT
Simplified Payments on Stacks
