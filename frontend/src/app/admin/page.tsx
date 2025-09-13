import styles from "./Admin.module.css";
import Link from "next/link";

export default function AdminPanel() {
  return (
    <main className={styles.centralAdministration}>
      <div className={styles.bienvenidad}>
        <h1>¡Bienvenido! Dashboard</h1>
      </div>

      <section className={styles.panelMetrics}>
        <article className={styles.metricsCard}>
          <h2>Boxeador Total</h2>
          <p>0000</p>
          <ul>
            <li>
              <span>Activo</span>
              <span>0000</span>
            </li>
            <li>
              <span>Inactivo</span>
              <span>0000</span>
            </li>

            <li>
              <span>Suspendido</span>
              <span>0000</span>
            </li>

            <li>
              <span>Restirado</span>
              <span>0000</span>
            </li>
          </ul>

          <Link href="">Crear Boxeador</Link>
        </article>

        <article className={styles.metricsCard}>
          <h2>Entrenador Total</h2>
          <p>0000</p>
          <ul>
            <li>
              <span>Director Tecnico</span>
              <span>0000</span>
            </li>

            <li>
              <span>Preparador Fisico </span>
              <span>0000</span>
            </li>

            <li>
              <span>Nutricionista</span>
              <span>0000</span>
            </li>
          </ul>

          <Link href="">Crear Entrenador</Link>
        </article>
      </section>

      <section className={styles.panelEvent}>
        <h2>Eventos Proximos</h2>

      </section>

      <section className={styles.panelCombat}>
        <h2>Combates</h2>
      </section>

      <section className={styles.panelDesarrollo}>
        <h2>Desarrollo</h2>
      </section>

      <section className={styles.panelNotifiquetion}>
        <h2>Notificaciones</h2>
      </section>
    </main>
  );
}
