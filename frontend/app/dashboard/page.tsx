"use client";

import { CreditCard, TrendingUp, Users, ArrowRight } from "lucide-react";
import Sidebar from "@/components/Sidebar/Sidebar";
import StatCard from "@/components/StatCard/StatCard";
import GlassCard from "@/components/GlassCard/GlassCard";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import styles from "./Dashboard.module.css";
import Button from "@/components/Button/Button";

export default function Dashboard() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.greeting}>Welcome back, Merchant</h1>
            <p className={styles.subtext}>Your payment activity is up 12.5% this week.</p>
          </div>
          <Button variant="primary">Generate Payment Link</Button>
        </header>

        <section className={styles.statsGrid}>
          <StatCard 
            label="Total Revenue" 
            value="12,842 STX" 
            trend="+8.2%" 
            icon={<CreditCard size={24} />} 
          />
          <StatCard 
            label="Active Customers" 
            value="1,204" 
            trend="+15.3%" 
            icon={<Users size={24} />} 
          />
          <StatCard 
            label="Avg. Payment" 
            value="45.2 STX" 
            trend="-2.1%" 
            icon={<TrendingUp size={24} />} 
          />
        </section>

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
              {['BTC-V2', 'ETH-V2', 'LTC-V2'].map(token => (
                <div key={token} className={styles.tokenItem}>
                  <span>{token}</span>
                  <span className={styles.badge}>Live</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
