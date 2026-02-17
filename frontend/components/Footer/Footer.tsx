"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>
        <a href="https://github.com/DevSolex/S-pay" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} S-pay · Stacks Mainnet</p>
    </footer>
  );
}
