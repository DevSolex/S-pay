"use client";

import { useState, useEffect, useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { getProtocolStatus } from "@/lib/read-only";

export function useProtocolStatus() {
  const { address } = useStacks();
  const [status, setStatus] = useState<unknown>(null);

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
