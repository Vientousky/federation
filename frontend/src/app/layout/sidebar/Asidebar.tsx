import Link from "next/link";
import { PiRanking, PiBuildings ,PiUserListLight, PiCalendar} from "react-icons/pi";
import { BsPersonRolodex } from "react-icons/bs";
import {BsPersonVcard  } from "react-icons/bs";
import styles from "./asidebar.module.css";
import Image from "next/image";

export default function Asidebar() {
  return (
    <aside className={styles.asidebar}>
      <figure className={styles.asidebarImg}>
        <Link href="/admin">
          <Image src="/img/logo.webp" alt="" width={200} height={100} />
        </Link>
      </figure>

      <nav className={styles.asidebarNav}>
        <ul>
          <li>
            <span>
              <PiBuildings/>
            </span>
            <a href="">Inicio</a>
          </li>

          <li>
            <span>
                <PiUserListLight/>
            </span>
            <a href="">Boxeador</a>
          </li>
          <li>
            <span>
                <BsPersonRolodex/>
            </span>
            <a href="">Entrenador</a>
          </li>
          <li>
            <span>
                <PiCalendar  />
            </span>
            <a href="">eventos</a>
          </li>
          <li>
            <span>
                <PiRanking/>
            </span>
            <a href="">ranking</a>
          </li>
          <li>
            <span>
                <BsPersonVcard />
            </span>
            <a href="">Licencias Provincial</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
