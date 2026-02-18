# S-pay Frontend

Professional Next.js frontend for S-pay payment gateway.

## Architecture

```
frontend/
├── app/              # Next.js app router pages
├── components/       # React components
├── config/           # App configuration
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Legacy utilities
├── services/         # Business logic services
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

## Key Features

### Services Layer
- **ContractService**: Builder pattern for contract calls
- **WalletService**: Wallet interaction abstraction

### Custom Hooks
- `useContractCall`: Generic contract call handler
- `usePayment`: Payment processing
- `useVault`: Vault operations
- `useMerchant`: Merchant management

### Type Safety
- Comprehensive TypeScript types
- API response types
- Model definitions

### Utilities
- Formatters (address, amount, currency, date)
- Validators (address, amount, username, URL)

## Usage

```typescript
import { usePayment } from '@/hooks';
import { formatAmount } from '@/utils';

function PaymentComponent() {
  const { processPayment, loading } = usePayment();
  
  const handlePay = async () => {
    await processPayment(1000000, 'SP...');
  };
  
  return <button onClick={handlePay} disabled={loading}>Pay</button>;
}
```

## Development

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run lint    # Run linter
```
