"use client";

import { useCallback } from "react";
import { useStacks } from "@/context/StacksContext";
import { buildReclaimStakeOptions } from "@/lib/contract-calls";

export function useReclaimStake() {
  const { callContract } = useStacks();

  const reclaimStake = useCallback(() => {
    callContract(buildReclaimStakeOptions());
  }, [callContract]);

  return { reclaimStake };
}
