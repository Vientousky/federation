"use client";

import { usePathname } from "next/navigation";
import styles from "./index.module.css";

type navLinks = {
  name: string;
  href: string;
};

export default function Nav({ links }: { links: navLinks[] }) {

  const pathname = usePathname(); 

  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <a key={link.href} href={link.href} className={`${styles.navLinks} ${pathname === link.href ? styles.active : ''}`}>
          {link.name}
        </a>
      ))}
    </nav>
  );
}
