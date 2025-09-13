"use client";

import { useRouter } from "next/navigation";
import styles from "./asidebar.module.css";
import { BsPower , BsGear } from "react-icons/bs";

export default function AsidebarLogin() {
  const router = useRouter();

  function handleLogout() {
    // Borra la cookie token
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirige a login
    router.push("/");
  }

  return (
    <ul className={`${styles.navList} ${styles.navListSecondary}`}>
      <li className={styles.navItem}>
        <button className={styles.navItemButton}>
          <span className={styles.linkIcon}>
            <BsGear />
          </span>
          <span className={styles.linkText}>Configuración</span>
        </button>
      </li>

      <li className={styles.navItem} onClick={handleLogout}>
        <button className={styles.navItemButton}>
          <span className={styles.linkIcon}>
            <BsPower />
          </span>

          <span className={styles.linkText}>
            Cerrar Sesión
          </span>
        </button>
      </li>
    </ul>
  );
}
