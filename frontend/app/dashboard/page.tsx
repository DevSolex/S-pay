"use client";

import { ArrowRight } from "lucide-react";
import Sidebar from "@/components/Sidebar/Sidebar";
import StatsGrid from "@/components/Dashboard/StatsGrid";
import GlassCard from "@/components/GlassCard/GlassCard";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import styles from "./Dashboard.module.css";
import Button from "@/components/Button/Button";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Dashboard() {
  const { stats, tokens, loading } = useDashboardData();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.greeting}>Welcome back, Merchant</h1>
            <p className={styles.subtext}>Everything is looking good today.</p>
          </div>
          <Button variant="primary">Generate Payment Link</Button>
        </header>

        <StatsGrid stats={stats} />

        <section className={styles.bottomGrid}>
          <GlassCard className={styles.transactions}>
            <div className={styles.sectionHeader}>
              <h2>Recent Activity</h2>
              <button className={styles.viewAll}>View All <ArrowRight size={16} /></button>
            </div>
            <TransactionTable />
          </GlassCard>

          <GlassCard className={styles.quickActions}>
            <h2>Active Tokens</h2>
            <div className={styles.tokenList}>
              {tokens.map(token => (
                <div key={token.symbol} className={styles.tokenItem}>
                  <span>{token.symbol}</span>
                  <span className={styles.badge}>{token.status}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
