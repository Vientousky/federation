import styles from "./index.module.css";

export default function Entrenador() {
  return (
    <section className={styles.cabecera}>
      <h1 className={styles.title}>!Bienvenido a la seción de entrenadores¡</h1>
      <p className={styles.subtitle}>
        En esta sección podrás encontrar a los mejores entrenadores de la
        Provincia del Chaco
      </p>

      <div className={styles.entrenadores}>
        <article className={styles.entrenador}>
          <main className={styles.info}>
            <figure className={styles.foto}>
              <img src="/img/default.jpeg" alt="" />
            </figure>

            <div className={styles.datos}>
              <section className={styles.nombre}>
                <h1>Juan Federico</h1>
                <p>Entrenador</p>
              </section>

              <div className={styles.datosPersonales}>
                <section className={styles.item}>
                  <span>Numero de Licencia</span>
                  <span>FZ-4545</span>
                </section>

                <section className={styles.item}>
                  <span>Nacimiento</span>
                  <span>00 00 0000</span>
                </section>

                <section className={styles.item}>
                  <span>Edad</span>
                  <span>00</span>
                </section>

                <section className={styles.item}>
                  <span>Altura</span>
                  <span>00</span>
                </section>
              </div>
            </div>
          </main>

          <footer className={styles.footer}>
            <h1> Charata Provincia del Chaco </h1>
          </footer>
        </article>

        <article className={styles.entrenador}>
          <main className={styles.info}>
            <figure className={styles.foto}>
              <img src="/img/default.jpeg" alt="" />
            </figure>

            <div className={styles.datos}>
              <section className={styles.nombre}>
                <h1>Juan Federico</h1>
                <p>Entrenador</p>
              </section>

              <div className={styles.datosPersonales}>
                <section className={styles.item}>
                  <span>Numero de Licencia</span>
                  <span>FZ-4545</span>
                </section>

                <section className={styles.item}>
                  <span>Nacimiento</span>
                  <span>00 00 0000</span>
                </section>

                <section className={styles.item}>
                  <span>Edad</span>
                  <span>00</span>
                </section>

                <section className={styles.item}>
                  <span>Altura</span>
                  <span>00</span>
                </section>
              </div>
            </div>
          </main>

          <footer className={styles.footer}>
            <h1> Charata Provincia del Chaco </h1>
          </footer>
        </article>

        <article className={styles.entrenador}>
          <main className={styles.info}>
            <figure className={styles.foto}>
              <img src="/img/default.jpeg" alt="" />
            </figure>

            <div className={styles.datos}>
              <section className={styles.nombre}>
                <h1>Juan Federico</h1>
                <p>Entrenador</p>
              </section>

              <div className={styles.datosPersonales}>
                <section className={styles.item}>
                  <span>Numero de Licencia</span>
                  <span>FZ-4545</span>
                </section>

                <section className={styles.item}>
                  <span>Nacimiento</span>
                  <span>00 00 0000</span>
                </section>

                <section className={styles.item}>
                  <span>Edad</span>
                  <span>00</span>
                </section>

                <section className={styles.item}>
                  <span>Altura</span>
                  <span>00</span>
                </section>
              </div>
            </div>
          </main>

          <footer className={styles.footer}>
            <h1> Charata Provincia del Chaco </h1>
          </footer>
        </article>
      </div>
    </section>
  );
}
