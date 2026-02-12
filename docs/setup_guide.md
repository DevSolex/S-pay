# S-pay Setup Guide

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Clarinet](https://github.com/hirosystems/clarinet)
- [Docker](https://www.docker.com/) (optional, for local devnet)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevSolex/S-pay.git
   cd S-pay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy the example environment file:
   ```bash
   cp .env.template .env
   ```
   Edit `.env` and fill in your details:
   - `STACKS_NETWORK`: `testnet` or `mainnet`
   - `DEPLOYER_KEY`: Your Stacks private key (for deployment)

## Running Locally

1. **Start Clarinet Devnet**
   ```bash
   clarinet integrate
   ```
   This will start a local Stacks blockchain and deploy the contracts.

2. **Run Tests**
   ```bash
   npm test
   ```
   This runs the Vitest test suite against the contracts.

3. **Deploy Contracts**
   To deploy to testnet:
   ```bash
   npm run deploy:testnet
   ```

## Troubleshooting
- **Clarinet issues**: Ensure Docker is running.
- **Node version**: Use `nvm` to switch to Node 18 if you encounter errors.
