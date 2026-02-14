"use client";

import { CreditCard, TrendingUp, Users } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import styles from "./StatsGrid.module.css";

interface StatsGridProps {
  stats: any[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const icons = [
    <CreditCard size={24} key="icon1" />,
    <Users size={24} key="icon2" />,
    <TrendingUp size={24} key="icon3" />,
  ];

  return (
    <section className={styles.grid}>
      {stats.map((stat, index) => (
        <StatCard 
          key={stat.label}
          label={stat.label}
          value={stat.value}
          trendValue={stat.trendValue}
          trendType={stat.trendType}
          icon={icons[index]}
        />
      ))}
    </section>
  );
}
