import { useState } from "react";
import Link from "next/link";
import AsidebarNav from "./AsidebarNav";
import AsidebarLogin from "./AsidebarLogin";
import { BsArrowBarLeft   } from "react-icons/bs";
import {
  PiRanking,
  PiBuildings,
  PiUserListLight,
  PiCalendar,
} from "react-icons/pi";
import { BsPersonRolodex } from "react-icons/bs";
import styles from "./asidebar.module.css";
import Image from "next/image";

export default function Asidebar() {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  const asidebarNav = [
    {
      name: "Inicio",
      icon: <PiBuildings />,
      href: "/admin",
    },
    {
      name: "Boxeador",
      icon: <PiUserListLight />,
      href: "/admin/boxeador",
    },
    {
      name: "Entrenador",
      icon: <BsPersonRolodex />,
      href: "/admin/entrenador",
    },
    {
      name: "Eventos",
      icon: <PiCalendar />,
      href: "/admin/events",
    },
    {
      name: "Ranking",
      icon: <PiRanking />,
      href: "/admin/ranking",
    },
  ];

  return (
    <aside className={`${styles.asidebar} ${isCollapsed ? styles.asidebarCollapse : ""}`}>
      <figure className={styles.asidebarImg}>
        <Link href="/admin">
          <Image src="/img/logo.webp" alt="" width={200} height={100} />
        </Link>
        <figcaption className={styles.asidebarCollapse}>
          <button onClick={handleCollapse}>
            <BsArrowBarLeft  />
          </button>
        </figcaption>
      </figure>

      <nav className={styles.asidebarNav}>
        <AsidebarNav links={asidebarNav} />

        <AsidebarLogin />
      </nav>
    </aside>
  );
}
