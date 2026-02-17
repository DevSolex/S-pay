"use client";

import { useState, useEffect, useCallback } from "react";
import { principalCV } from "@stacks/transactions";
import { useStacks } from "@/context/StacksContext";
import { callReadOnly } from "@/lib/read-only";

export function useUserData() {
  const { address } = useStacks();
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

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
