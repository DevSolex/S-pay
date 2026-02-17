"use client";

import { useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { buildRegisterMerchantOptions } from "@/lib/contract-calls";

export function useRegisterMerchant() {
  const { callContract } = useStacks();

  const registerMerchant = useCallback(
    (businessName: string, website: string) => {
      callContract(buildRegisterMerchantOptions(businessName, website));
    },
    [callContract]
  );

  return { registerMerchant };
}
