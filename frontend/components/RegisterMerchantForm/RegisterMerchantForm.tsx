"use client";

import { useState } from "react";
import { useRegisterMerchant } from "@/hooks/useRegisterMerchant";
import { useStacks } from "@/context/StacksContext";
import styles from "./RegisterMerchantForm.module.css";

export function RegisterMerchantForm() {
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const { registerMerchant } = useRegisterMerchant();
  const { address } = useStacks();
  const isConnected = !!address;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName.trim() && website.trim())
      registerMerchant(businessName.trim(), website.trim());
  };

  if (!isConnected) return <p className={styles.hint}>Connect wallet first</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Business name (max 64 chars)"
        maxLength={64}
        className={styles.input}
      />
      <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Website (max 128 chars)"
        maxLength={128}
        className={styles.input}
      />
      <button type="submit" className={styles.btn}>
        Register Merchant
      </button>
    </form>
  );
}
