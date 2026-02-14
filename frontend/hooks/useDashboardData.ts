"use client";

import { useEffect, useState } from "react";
import { MOCK_STATS, MOCK_TRANSACTIONS, ACTIVE_TOKENS } from "@/lib/mock";

export function useDashboardData() {
  const [stats, setStats] = useState(MOCK_STATS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [tokens, setTokens] = useState(ACTIVE_TOKENS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return { stats, transactions, tokens, loading };
}
