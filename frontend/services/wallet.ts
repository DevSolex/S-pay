import { openContractCall } from "@stacks/connect";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { contractCalls } from "./contract";

export class WalletService {
  private network: StacksMainnet | StacksTestnet;

  constructor(isMainnet = true) {
    this.network = isMainnet ? new StacksMainnet() : new StacksTestnet();
  }

  async callContract(options: ReturnType<typeof contractCalls[keyof typeof contractCalls]>) {
    try {
      const result = await openContractCall({
        ...options,
        network: this.network,
        onFinish: (data) => {
          console.log("Transaction broadcast:", data.txId);
          return data;
        },
        onCancel: () => {
          console.log("Transaction cancelled");
        },
      });
      return result;
    } catch (error) {
      console.error("Contract call failed:", error);
      throw error;
    }
  }

  async registerUser(username: string) {
    return this.callContract(contractCalls.registerUser(username));
  }

  async registerMerchant(businessName: string, website: string) {
    return this.callContract(contractCalls.registerMerchant(businessName, website));
  }

  async processPayment(amount: bigint | number, recipient: string) {
    return this.callContract(contractCalls.processPayment(amount, recipient));
  }

  async vaultDeposit(amount: bigint | number) {
    return this.callContract(contractCalls.vaultDeposit(amount));
  }

  async vaultWithdraw(amount: bigint | number) {
    return this.callContract(contractCalls.vaultWithdraw(amount));
  }

  async merchantWithdraw(amount: bigint | number) {
    return this.callContract(contractCalls.merchantWithdraw(amount));
  }

  async reclaimStake() {
    return this.callContract(contractCalls.reclaimStake());
  }
}

export const walletService = new WalletService();
