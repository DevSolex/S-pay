# S-pay Test Suite

Comprehensive test coverage for the S-pay payment protocol and token contracts.

## Test Files

### `s-pay.test.ts`
Tests for the main S-pay protocol contract covering:
- Protocol initialization and status
- User registration and validation
- Merchant registration with stake handling
- Admin functions (verification, suspension)
- Payment processing with fee distribution
- Payment volume tracking
- Payment error handling
- Vault operations (deposit/withdraw)
- Merchant withdrawals
- Platform fees and global metrics

### `s-pay-token.test.ts`
Tests for the S-pay Token (SPAY) covering:
- SIP-010 compliance (name, symbol, decimals)
- Token transfer operations
- Balance tracking
- Minting functionality
- Minting restrictions (owner-only)
- Total supply tracking

## Running Tests

```bash
npm test
```

## Test Coverage

The test suite covers:
- ✅ Contract initialization
- ✅ User management
- ✅ Merchant lifecycle
- ✅ Payment processing
- ✅ Vault operations
- ✅ Token operations
- ✅ Access control
- ✅ Error conditions
