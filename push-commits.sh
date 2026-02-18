#!/bin/bash

# Commit 1: Add configuration constants
git add contract/config/constants.js
git commit -m "feat: add configuration constants for network and fees"

# Commit 2: Add environment utilities
git add contract/utils/env.js
git commit -m "feat: add environment variable utilities"

# Commit 3: Add network utilities
git add contract/utils/network.js
git commit -m "feat: add network utilities with retry logic"

# Commit 4: Add logging utilities
git add contract/utils/logger.js
git commit -m "feat: add logging utilities for better output"

# Commit 5: Add token template generator
git add contract/templates/token.js
git commit -m "feat: add token contract template generator"

# Commit 6: Add contract deployer service
git add contract/services/deployer.js
git commit -m "feat: add contract deployer service"

# Commit 7: Add contract interactor service
git add contract/services/interactor.js
git commit -m "feat: add contract interactor service"

# Commit 8: Add single deployment script
git add contract/scripts/deploy-single.js
git commit -m "feat: add single contract deployment script"

# Commit 9: Add batch deployment script
git add contract/scripts/deploy-batch.js
git commit -m "feat: add batch token deployment script"

# Commit 10: Add interaction script
git add contract/scripts/interact.js
git commit -m "feat: add contract interaction script"

# Commit 11: Add scripts documentation
git add contract/SCRIPTS.md
git commit -m "docs: add scripts documentation"

# Commit 12: Add payer token contract
git add contract/contracts/payer-token.clar
git commit -m "feat: add payer token SIP-010 contract"

# Commit 13: Add alpha token contract
git add contract/contracts/alpha-token.clar
git commit -m "feat: add alpha token contract"

# Commit 14: Add beta token contract
git add contract/contracts/beta-token.clar
git commit -m "feat: add beta token contract"

# Commit 15: Add gamma token contract
git add contract/contracts/gamma-token.clar
git commit -m "feat: add gamma token contract"

# Commit 16: Add delta token contract
git add contract/contracts/delta-token.clar
git commit -m "feat: add delta token contract"

# Commit 17: Add epsilon token contract
git add contract/contracts/epsilon-token.clar
git commit -m "feat: add epsilon token contract"

# Commit 18: Add zeta token contract
git add contract/contracts/zeta-token.clar
git commit -m "feat: add zeta token contract"

# Commit 19: Add eta token contract
git add contract/contracts/eta-token.clar
git commit -m "feat: add eta token contract"

# Commit 20: Add theta token contract
git add contract/contracts/theta-token.clar
git commit -m "feat: add theta token contract"

# Commit 21: Add iota token contract
git add contract/contracts/iota-token.clar
git commit -m "feat: add iota token contract"

# Commit 22: Add kappa token contract
git add contract/contracts/kappa-token.clar
git commit -m "feat: add kappa token contract"

# Commit 23: Add s-pay token contract
git add contract/contracts/s-pay-token.clar
git commit -m "feat: add s-pay token contract"

# Commit 24: Update Clarinet configuration
git add contract/Clarinet.toml
git commit -m "chore: update Clarinet.toml with new tokens"

# Commit 25: Update deployment plan
git add contract/deployments/default.simnet-plan.yaml
git commit -m "chore: update simnet deployment plan"

# Commit 26: Remove old deployment scripts
git rm contract/deploy-payer.js contract/deploy-batch.js 2>/dev/null || true
git commit -m "refactor: remove old deployment scripts" --allow-empty

# Commit 27: Remove old interaction scripts
git rm contract/interact-alpha.js contract/interact-*.js 2>/dev/null || true
git commit -m "refactor: remove old interaction scripts" --allow-empty

# Commit 28: Add deployment records
git add deployments/ 2>/dev/null || true
git commit -m "chore: add deployment records" --allow-empty

# Commit 29: Update project structure
git add contract/deploy-token.js 2>/dev/null || true
git commit -m "chore: cleanup legacy files" --allow-empty

# Commit 30: Final cleanup and documentation
git add .
git commit -m "chore: final cleanup and project restructure" --allow-empty

echo "✓ Created 30 commits"
echo "Pushing to devsolex/main..."
git push origin main

echo "✓ All changes pushed successfully!"
