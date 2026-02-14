"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          S-pay<span className={styles.dot}>.</span>
        </Link>
        <div className={styles.links}>
          <Link href="/payments" className={styles.link}>Payments</Link>
          <Link href="/tokens" className={styles.link}>Tokens</Link>
          <Link href="/docs" className={styles.link}>Developers</Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.connectBtn}>Connect</button>
        </div>
      </div>
    </nav>
  );
}
