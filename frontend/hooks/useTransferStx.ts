"use client";

import { useCallback } from "react";
import { useStacks } from "@/context/StacksContext";

export function useTransferStx() {
  const { transferStx } = useStacks();

  const transfer = useCallback(
    (recipient: string, amountMicroStx: bigint) => {
      transferStx(recipient, amountMicroStx);
    },
    [transferStx]
  );

  return { transfer };
}
