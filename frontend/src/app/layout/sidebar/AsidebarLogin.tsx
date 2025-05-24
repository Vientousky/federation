import styles from "./asidebar.module.css";
import { BsPersonCircle, BsGear  } from "react-icons/bs";


export default function AsidebarLogin() {
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

      <li className={styles.navItem}>
        <button className={styles.navItemButton}>
          <span className={styles.linkIcon}>
            <BsPersonCircle />
          </span>

          <div className={styles.linkText}>
            <h3>Jose Mancuello</h3>
            <p>Administrador</p>
          </div>
        </button>
      </li>
    </ul>
  );
}
