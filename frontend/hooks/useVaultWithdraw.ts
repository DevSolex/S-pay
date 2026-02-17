"use client";

import { useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { buildVaultWithdrawOptions } from "@/lib/contract-calls";

export function useVaultWithdraw() {
  const { callContract } = useStacks();

  const vaultWithdraw = useCallback(
    (amountMicroStx: bigint | number) => {
      callContract(buildVaultWithdrawOptions(amountMicroStx));
    },
    [callContract]
  );

  return { vaultWithdraw };
}
