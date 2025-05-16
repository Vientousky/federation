import styles from "./asidebar.module.css"

export default function Asidebar() {
    return (
        <aside className={styles.asidebar}>
            <figure className={styles.asidebarImg}>
                logo
            </figure>

            <nav className={styles.asidebarNav}>
                <ul>
                    <li>
                        <a href="">Boxeador</a>
                    </li>
                    <li>
                        <a href="">Entrenador</a>
                    </li>
                    <li>
                        <a href="">manager</a>
                    </li>
                    <li>
                        <a href="">eventos</a>
                    </li>
                    <li>
                        <a href="">ranking</a>
                    </li>
                    <li>
                        <a href="">Licencias Provincial</a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}