"use client";

import { VaultDepositForm } from "@/components/VaultDepositForm/VaultDepositForm";
import styles from "./vault.module.css";

export default function VaultPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Vault Deposit</h1>
      <p className={styles.subtitle}>
        Deposit STX to your S-pay vault. Minimum 0.000001 STX.
      </p>
      <VaultDepositForm />
    </div>
  );
}
