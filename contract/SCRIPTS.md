# S-pay Contract Scripts

Professional deployment and interaction scripts for S-pay contracts.

## Structure

```
contract/
├── config/          # Configuration constants
├── services/        # Core services (deployer, interactor)
├── utils/           # Utility functions (env, network, logger)
├── templates/       # Contract templates
└── scripts/         # Deployment and interaction scripts
```

## Usage

### Deploy Single Contract
```bash
node scripts/deploy-single.js <contract-name> <file-path> <fee>
```

### Deploy Batch Tokens
```bash
node scripts/deploy-batch.js
```

### Interact with Contract
```bash
node scripts/interact.js <contract-name> <tx-count> <mint-amount>
```

## Examples

```bash
# Deploy payer token
node scripts/deploy-single.js payer-token contracts/payer-token.clar 10000

# Deploy 10 tokens
node scripts/deploy-batch.js

# Mint tokens (35 transactions)
node scripts/interact.js alpha-token 35 1000000
```
