import styles from "./page.module.css";

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
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>Connect Wallet</button>
          <button className={styles.secondaryBtn}>Learn More</button>
        </div>
      </header>
    </div>
  );
}
// Final polish 62
// Final polish 63
// Final polish 64
