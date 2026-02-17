"use client";

import { useState } from "react";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import styles from "./RegisterUserForm.module.css";

export function RegisterUserForm() {
  const [username, setUsername] = useState("");
  const { registerUser, isConnected } = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) registerUser(username.trim());
  };

  if (!isConnected) {
    return <p className={styles.hint}>Connect wallet to register</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username (max 24 chars)"
        maxLength={24}
        className={styles.input}
      />
      <button type="submit" className={styles.btn}>
        Register
      </button>
    </form>
  );
}
