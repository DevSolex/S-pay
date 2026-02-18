import { stringAsciiCV, uintCV, principalCV, ClarityValue } from "@stacks/transactions";
import { CONTRACT_CONFIG } from "@/config/app";

interface ContractCallOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: ClarityValue[];
}

class ContractCallBuilder {
  private buildOptions(functionName: string, args: ClarityValue[]): ContractCallOptions {
    return {
      contractAddress: CONTRACT_CONFIG.address,
      contractName: CONTRACT_CONFIG.name,
      functionName,
      functionArgs: args,
    };
  }

  registerUser(username: string) {
    return this.buildOptions("register-user", [stringAsciiCV(username)]);
  }

  registerMerchant(businessName: string, website: string) {
    return this.buildOptions("register-merchant", [
      stringAsciiCV(businessName),
      stringAsciiCV(website),
    ]);
  }

  processPayment(amount: bigint | number, recipient: string) {
    return this.buildOptions("process-payment", [
      uintCV(amount),
      principalCV(recipient),
    ]);
  }

  vaultDeposit(amount: bigint | number) {
    return this.buildOptions("vault-deposit", [uintCV(amount)]);
  }

  vaultWithdraw(amount: bigint | number) {
    return this.buildOptions("vault-withdraw", [uintCV(amount)]);
  }

  merchantWithdraw(amount: bigint | number) {
    return this.buildOptions("merchant-withdraw", [uintCV(amount)]);
  }

  reclaimStake() {
    return this.buildOptions("reclaim-stake", []);
  }
}

export const contractCalls = new ContractCallBuilder();
