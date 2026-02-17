"use client";

import { useState, useEffect, useCallback } from "react";
import { principalCV } from "@stacks/transactions";
import { useStacks } from "@/context/StacksContext";
import { callReadOnly } from "@/lib/read-only";

export function useUserData() {
  const { userData } = useStacks();
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const address =
    userData?.profile?.stxAddress?.mainnet ?? userData?.profile?.stxAddress?.testnet;

  const fetchUserData = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    try {
      const result = await callReadOnly(
        "get-user-data",
        [principalCV(address)],
        address
      );
      setData(result);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { userData: data, loading, refetch: fetchUserData };
}
