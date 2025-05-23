import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./asidebar.module.css";

type AsidebarNavProps = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export default function AsidebarNav({ links }: { links: AsidebarNavProps[] }) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href ? styles.active : "";
  };

  return (
    <ul className={`${styles.navList} ${styles.navListPrimary}`}>
      {links.map((link) => (
        <li
          key={link.name}
          className={`${styles.navItem} ${isActive(link.href)}`}
        >
          <Link href={link.href} className={styles.ItemLink}>
            <span className={styles.linkIcon}>{link.icon}</span>

            <span className={styles.linkText}>{link.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
