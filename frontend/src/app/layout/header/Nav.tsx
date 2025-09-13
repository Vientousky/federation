"use client";

import { usePathname } from "next/navigation";
import styles from "./index.module.css";

type navLinks = {
  name: string;
  href: string;
};


export default function Nav({ links, className = "", onLinkClick }: { links: navLinks[]; className?: string; onLinkClick?: () => void }) {

  const pathname = usePathname(); 

  return (
    <nav className={`${styles.nav} ${className}`}>
      {links.map((link) => (
        <a key={link.href} href={link.href} className={`${styles.navLinks} ${pathname === link.href ? styles.active : ''}`} onClick={onLinkClick}>
          {link.name}
        </a>
      ))}
    </nav>
  );
}
