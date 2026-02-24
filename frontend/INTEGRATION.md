# Payment VM Frontend Integration

Complete frontend integration for the payment-vm smart contract deployed on Stacks mainnet.

## Contract Details

- **Contract Address**: `SP2DBFGMT7SATSJPCCA38SDDPBNNQ86QWADJ3E6WT`
- **Contract Name**: `payment-vm`
- **Network**: Stacks Mainnet

## Features Implemented

### Authentication
- Wallet connection using @stacks/connect
- Support for Xverse, Leather, and other Stacks wallets
- Session management with UserSession

### Read-Only Functions
- Protocol status monitoring
- User data retrieval
- Merchant data retrieval
- Active merchant verification

### Transaction Functions
- User registration
- Merchant registration
- Payment processing
- Vault deposits
- Vault withdrawals

### React Hooks
- `useUserData` - Fetch user information
- `useMerchantData` - Fetch merchant information
- `useProtocolStatus` - Monitor protocol metrics

### Components
- `ConnectButton` - Wallet connection UI
- `RegisterUserForm` - User registration
- `RegisterMerchantForm` - Merchant onboarding
- `PaymentForm` - Payment processing
- `VaultManager` - Deposit/withdraw management
- `UserProfile` - Display user data
- `MerchantProfile` - Display merchant data
- `ProtocolStats` - Protocol metrics dashboard

### Utilities
- Address and amount formatting
- Input validation
- Explorer URL generation

## Usage

```bash
npm run dev
```

Navigate to `/dashboard` to access the full integration.
