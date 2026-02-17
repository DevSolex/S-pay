"use client";

import { useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { buildMerchantWithdrawOptions } from "@/lib/contract-calls";

export function useMerchantWithdraw() {
  const { callContract } = useStacks();

  const merchantWithdraw = useCallback(
    (amountMicroStx: bigint | number) => {
      callContract(buildMerchantWithdrawOptions(amountMicroStx));
    },
    [callContract]
  );

  return { merchantWithdraw };
}
