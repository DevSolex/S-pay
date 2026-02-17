"use client";

import { useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { buildRegisterUserOptions } from "@/lib/contract-calls";

export function useRegisterUser() {
  const { callContract, userData } = useStacks();

  const registerUser = useCallback(
    (username: string) => {
      const opts = buildRegisterUserOptions(username);
      callContract(opts);
    },
    [callContract]
  );

  return { registerUser, isConnected: !!userData };
}
