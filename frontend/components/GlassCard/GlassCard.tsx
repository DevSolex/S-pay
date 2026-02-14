import React from "react";
import styles from "./GlassCard.module.css";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ 
  children, 
  className = "", 
  hoverEffect = true 
}: GlassCardProps) {
  return (
    <div className={`${styles.card} ${hoverEffect ? styles.hover : ""} ${className}`}>
      {children}
    </div>
  );
}
