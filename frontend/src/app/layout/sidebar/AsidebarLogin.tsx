"use client";

import { useRouter } from "next/navigation";
import styles from "./asidebar.module.css";
import { BsPersonCircle, BsGear } from "react-icons/bs";

export default function AsidebarLogin() {
  const router = useRouter();

  function handleLogout() {
    // Borra la cookie token
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirige a login
    router.push("/admin/login");
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
            <BsPersonCircle />
          </span>

          <div className={styles.linkText}>
            <h3>En desarrollo</h3>
            <p>Administrador</p>
          </div>
        </button>
      </li>
    </ul>
  );
}
