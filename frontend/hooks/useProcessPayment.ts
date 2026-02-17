"use client";

import { useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { buildProcessPaymentOptions } from "@/lib/contract-calls";

export function useProcessPayment() {
  const { callContract } = useStacks();

  const processPayment = useCallback(
    (amountMicroStx: bigint | number, recipient: string) => {
      callContract(buildProcessPaymentOptions(amountMicroStx, recipient));
    },
    [callContract]
  );

  return { processPayment };
}
