import React from "react";
import GlassCard from "../GlassCard/GlassCard";
import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: string;
  trendValue: string;
  trendType: "up" | "down";
  icon: React.ReactNode;
}

export default function StatCard({ label, value, trendValue, trendType, icon }: StatCardProps) {
  return (
    <GlassCard className={styles.statCard}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
        <p className={`${styles.trend} ${styles[trendType]}`}>
          {trendType === "up" ? "↑" : "↓"} {trendValue}
        </p>
      </div>
    </GlassCard>
  );
}
