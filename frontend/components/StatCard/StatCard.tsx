import React from "react";
import GlassCard from "../GlassCard/GlassCard";
import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}

export default function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <GlassCard className={styles.statCard}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
        <p className={styles.trend}>{trend}</p>
      </div>
    </GlassCard>
  );
}
