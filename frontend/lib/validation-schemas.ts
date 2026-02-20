import { z } from 'zod';

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(24, 'Username must be at most 24 characters')
  .regex(/^[a-z0-9-]+$/, 'Username can only contain lowercase letters, numbers, and hyphens');

export const businessNameSchema = z
  .string()
  .min(2, 'Business name must be at least 2 characters')
  .max(50, 'Business name must be at most 50 characters');

export const amountSchema = z
  .number()
  .positive('Amount must be positive')
  .finite('Amount must be finite');

export const stxAddressSchema = z
  .string()
  .regex(/^(SP|ST)[0-9A-Z]{38,41}$/, 'Invalid Stacks address');

export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .max(200, 'URL must be at most 200 characters');

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(100, 'Email must be at most 100 characters');

export const registerUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema.optional(),
});

export const registerMerchantSchema = z.object({
  businessName: businessNameSchema,
  website: urlSchema.optional(),
  description: z.string().max(500, 'Description must be at most 500 characters').optional(),
  stakeAmount: amountSchema.min(1000000, 'Minimum stake is 1 STX'),
});

export const paymentSchema = z.object({
  merchantAddress: stxAddressSchema,
  amount: amountSchema,
  memo: z.string().max(100, 'Memo must be at most 100 characters').optional(),
});

export const vaultDepositSchema = z.object({
  amount: amountSchema,
  token: z.string().min(1, 'Token is required'),
});

export const withdrawalSchema = z.object({
  amount: amountSchema,
  recipient: stxAddressSchema.optional(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type RegisterMerchantInput = z.infer<typeof registerMerchantSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type VaultDepositInput = z.infer<typeof vaultDepositSchema>;
export type WithdrawalInput = z.infer<typeof withdrawalSchema>;
