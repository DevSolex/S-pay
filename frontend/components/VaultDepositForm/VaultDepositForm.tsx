"use client";

import { useState } from "react";
import { useVaultDeposit } from "@/hooks/useVaultDeposit";
import styles from "./VaultDepositForm.module.css";

export function VaultDepositForm() {
  const [amountStx, setAmountStx] = useState("");
  const { vaultDeposit } = useVaultDeposit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = BigInt(Math.floor(parseFloat(amountStx || "0") * 1e6));
    if (amount <= BigInt(0)) return;
    vaultDeposit(amount);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="number"
        step="0.000001"
        min="0"
        value={amountStx}
        onChange={(e) => setAmountStx(e.target.value)}
        placeholder="Amount (STX)"
        className={styles.input}
        aria-label="Amount in STX"
      />
      <button type="submit" className={styles.btn}>
        Deposit to Vault
      </button>
    </form>
  );
}
