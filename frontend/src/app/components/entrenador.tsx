import styles from "../styles/entrenador.module.css";
import Image from "next/image";

export default async function Entrenador() {
  return (
    <article className={styles.entrenador}>
      <header className={styles.header}>
        <figure className={styles.foto}>
          <Image
            src="/img/default.jpeg"
            alt="Foto de Matias Mancuello"
            width={125}
            height={125}
          />
        </figure>

        <section className={styles.info}>
          <div className={styles.nombre}>
            <h2>Matias Mancuello</h2>
          </div>

          <div className={styles.datos}>
            <section className={styles.card}>
              <span>Edad:</span> <span>31 años</span>
            </section>
            <section className={styles.card}>
              <span>Nacimiento:</span> <span>00/00/0000</span>
            </section>
            <section className={styles.card}>
              <span>Licencia:</span> <span>FX_220</span>
            </section>
            <section className={styles.card}>
              <span>Carrera:</span> <span>+6 años</span>
            </section>
          </div>
        </section>
      </header>

      <footer className={styles.footer}>
        
          <section className={styles.locationSection}>
            <span className={styles.flagContainer}>
              <Image
                src="/flags/saenz.png"
                alt="Bandera de Sáenz Peña"
                width={30}
                height={20}
              />
            </span>
            <strong className={styles.cityName}>Roque Sáenz Peña</strong>
          </section>

          <section className={styles.actionSection}>
            <a className={styles.moreLink} href="#">
              Saber más
            </a>
          </section>
        </footer>

    </article>
  );
}
