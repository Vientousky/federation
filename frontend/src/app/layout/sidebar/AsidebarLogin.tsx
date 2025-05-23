import styles from "./asidebar.module.css";
import { BsPersonCircle, BsGear  } from "react-icons/bs";


export default function AsidebarLogin() {
  return (
    <ul className={`${styles.navList} ${styles.navListSecondary}`}>
      <li className={styles.navItem}>
        <button className={styles.navItemButton}>
          <span>
            <BsGear />
          </span>
          <span>Configuración</span>
        </button>
      </li>

      <li className={styles.navItem}>
        <button className={styles.navItemButton}>
          <span>
            <BsPersonCircle />
          </span>

          <div>
            <h3>Jose Mancuello</h3>
            <p>Administrador</p>
          </div>
        </button>
      </li>
    </ul>
  );
}
