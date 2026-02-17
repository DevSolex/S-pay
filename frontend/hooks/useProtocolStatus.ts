"use client";

import { useState, useEffect, useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { getProtocolStatus } from "@/lib/read-only";

export function useProtocolStatus() {
  const { userData } = useStacks();
  const [status, setStatus] = useState<unknown>(null);

  const address =
    userData?.profile?.stxAddress?.mainnet ?? userData?.profile?.stxAddress?.testnet;

  const fetchStatus = useCallback(async () => {
    const sender = address ?? "SP2DBFGMT7SATSJPCCA38SDDPBNNQ86QWADJ3E6WT";
    const result = await getProtocolStatus(sender);
    setStatus(result);
  }, [address]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, refetch: fetchStatus };
}
