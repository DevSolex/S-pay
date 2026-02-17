/**
 * Contract call helpers using @stacks/transactions for Clarity types
 * and @stacks/connect for openContractCall signing.
 */
import { stringAsciiCV, uintCV, principalCV } from "@stacks/transactions";
import { SPAY_CONTRACT } from "./constants";

export function buildRegisterUserOptions(username: string) {
  return {
    contractAddress: SPAY_CONTRACT.address,
    contractName: SPAY_CONTRACT.name,
    functionName: "register-user",
    functionArgs: [stringAsciiCV(username)],
  };
}

export function buildVaultDepositOptions(amount: bigint | number) {
  return {
    contractAddress: SPAY_CONTRACT.address,
    contractName: SPAY_CONTRACT.name,
    functionName: "vault-deposit",
    functionArgs: [uintCV(amount)],
  };
}

export function buildProcessPaymentOptions(amount: bigint | number, recipient: string) {
  return {
    contractAddress: SPAY_CONTRACT.address,
    contractName: SPAY_CONTRACT.name,
    functionName: "process-payment",
    functionArgs: [uintCV(amount), principalCV(recipient)],
  };
}

export function buildRegisterMerchantOptions(
  businessName: string,
  website: string
) {
  return {
    contractAddress: SPAY_CONTRACT.address,
    contractName: SPAY_CONTRACT.name,
    functionName: "register-merchant",
    functionArgs: [stringAsciiCV(businessName), stringAsciiCV(website)],
  };
}

export function buildVaultWithdrawOptions(amount: bigint | number) {
  return {
    contractAddress: SPAY_CONTRACT.address,
    contractName: SPAY_CONTRACT.name,
    functionName: "vault-withdraw",
    functionArgs: [uintCV(amount)],
  };
}

export function buildMerchantWithdrawOptions(amount: bigint | number) {
  return {
    contractAddress: SPAY_CONTRACT.address,
    contractName: SPAY_CONTRACT.name,
    functionName: "merchant-withdraw",
    functionArgs: [uintCV(amount)],
  };
}
