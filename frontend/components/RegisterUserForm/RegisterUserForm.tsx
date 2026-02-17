"use client";

import { useState } from "react";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import styles from "./RegisterUserForm.module.css";

const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

export function RegisterUserForm() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { registerUser, isConnected } = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const val = username.trim();
    if (!val) {
      setError("Username required");
      return;
    }
    if (!USERNAME_REGEX.test(val)) {
      setError("Only letters, numbers, - and _");
      return;
    }
    registerUser(val);
  };

  if (!isConnected) {
    return <p className={styles.hint}>Connect wallet to register</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}
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
