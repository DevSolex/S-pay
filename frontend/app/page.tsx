import styles from "./page.module.css";
import { ConnectWallet } from "@/components/ConnectWallet/ConnectWallet";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.glow} />
        <h1 className={styles.title}>
          Secure Payments, <br />
          <span>Powered by Stacks.</span>
        </h1>
        <p className={styles.description}>
          Experience the most premium payment gateway for the Bitcoin ecosystem.
          Fast, decentralized, and built for modern commerce.
        </p>
        <ConnectWallet />
      </header>
    </div>
  );
}
