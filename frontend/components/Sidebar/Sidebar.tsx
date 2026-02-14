"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  History, 
  Coins, 
  Code, 
  Settings,
  ShieldCheck
} from "lucide-react";
import styles from "./Sidebar.module.css";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Payments", icon: History, href: "/payments" },
  { name: "Tokens", icon: Coins, href: "/tokens" },
  { name: "Developers", icon: Code, href: "/docs" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <ShieldCheck size={32} color="var(--primary)" />
          <span>S-pay</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles.active : ""}`}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <button className={styles.navItem}>
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
