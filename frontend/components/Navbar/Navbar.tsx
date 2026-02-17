"use client";

import Link from "next/link";
import { useStacks } from "@/context/StacksContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { address: addr, handleConnect, handleDisconnect } = useStacks();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          S-pay<span className={styles.dot}>.</span>
        </Link>
        <div className={styles.links}>
          <Link href="/register" className={styles.link}>Register</Link>
          <Link href="/pay" className={styles.link}>Pay</Link>
          <Link href="/vault" className={styles.link}>Vault</Link>
          <Link href="/merchant/register" className={styles.link}>Merchant</Link>
          <Link href="/payments" className={styles.link}>Payments</Link>
          <Link href="/tokens" className={styles.link}>Tokens</Link>
          <Link href="/docs" className={styles.link}>Developers</Link>
        </div>
        <div className={styles.actions}>
          {addr ? (
            <>
              <span className={styles.address}>{addr.slice(0, 6)}…{addr.slice(-4)}</span>
              <button className={styles.connectBtn} onClick={handleDisconnect}>Disconnect</button>
            </>
          ) : (
            <button className={styles.connectBtn} onClick={handleConnect}>Connect</button>
          )}
        </div>
      </div>
    </nav>
  );
}
