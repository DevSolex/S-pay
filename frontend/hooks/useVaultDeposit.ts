"use client";

import { useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { buildVaultDepositOptions } from "@/lib/contract-calls";

export function useVaultDeposit() {
  const { callContract } = useStacks();

  const vaultDeposit = useCallback(
    (amountMicroStx: bigint | number) => {
      callContract(buildVaultDepositOptions(amountMicroStx));
    },
    [callContract]
  );

  return { vaultDeposit };
}
