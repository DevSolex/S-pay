#!/bin/bash

# Commit 1: Add app configuration
git add frontend/config/app.ts
git commit -m "feat(frontend): add centralized app configuration"

# Commit 2: Add TypeScript models
git add frontend/types/models.ts
git commit -m "feat(frontend): add TypeScript model definitions"

# Commit 3: Add API types
git add frontend/types/api.ts
git commit -m "feat(frontend): add API type definitions"

# Commit 4: Add types index
git add frontend/types/index.ts
git commit -m "feat(frontend): add types barrel export"

# Commit 5: Add formatter utilities
git add frontend/utils/formatters.ts
git commit -m "feat(frontend): add formatter utilities"

# Commit 6: Add validator utilities
git add frontend/utils/validators.ts
git commit -m "feat(frontend): add validation utilities"

# Commit 7: Add utils index
git add frontend/utils/index.ts
git commit -m "feat(frontend): add utils barrel export"

# Commit 8: Add contract service
git add frontend/services/contract.ts
git commit -m "feat(frontend): add contract service with builder pattern"

# Commit 9: Add wallet service
git add frontend/services/wallet.ts
git commit -m "feat(frontend): add wallet service abstraction"

# Commit 10: Add services index
git add frontend/services/index.ts
git commit -m "feat(frontend): add services barrel export"

# Commit 11: Add useContractCall hook
git add frontend/hooks/useContractCall.ts
git commit -m "feat(frontend): add generic contract call hook"

# Commit 12: Add usePayment hook
git add frontend/hooks/usePayment.ts
git commit -m "feat(frontend): add payment processing hook"

# Commit 13: Add useVault hook
git add frontend/hooks/useVault.ts
git commit -m "feat(frontend): add vault operations hook"

# Commit 14: Add useMerchant hook
git add frontend/hooks/useMerchant.ts
git commit -m "feat(frontend): add merchant management hook"

# Commit 15: Add architecture documentation
git add frontend/ARCHITECTURE.md
git commit -m "docs(frontend): add architecture documentation"

# Commit 16: Final frontend refactoring
git add frontend/
git commit -m "chore(frontend): complete frontend refactoring" --allow-empty

echo "✓ Created 16 frontend commits"
echo "Pushing to devsolex/main..."
git push devsolex main

echo "✓ Frontend refactoring pushed successfully!"
