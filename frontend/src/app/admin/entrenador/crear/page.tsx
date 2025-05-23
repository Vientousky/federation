import Image from "next/image";
import styles from "./createTrainer.module.css";

export default function CrearEntrenadorPage() {
  return (
    <form action="">
      <div className={styles.createTrainer}>
        <section className={styles.createTrainer__container}>
          <figure className={styles.createTrainer__imageSection}>
            <Image
              src="/img/official.jpeg"
              alt="Entrenador"
              width={150}
              height={150}
              className={styles.createTrainer__image}
            />
          </figure>

          <section className={styles.createTrainer__infoSection}>
            <article className={styles.createTrainer__nameRow}>
              <div className={styles.createTrainer__field}>
                <label htmlFor="">Nombre</label>
                <input type="text" />
              </div>

              <div className={styles.createTrainer__field}>
                <label htmlFor="">Apellido</label>
                <input type="text" />
              </div>
            </article>

            <article className={styles.createTrainer__extraInfo}>
              <div className={styles.createTrainer__field}>
                <label htmlFor="">Nacimiento</label>
                <input type="date" />
              </div>

              <div className={styles.createTrainer__field}>
                <label htmlFor="">Sexo</label>
                <select name="" id="">
                  <option value="">Masculino</option>
                  <option value="">Femenino</option>
                </select>
              </div>

              <div className={styles.createTrainer__field}>
                <label htmlFor="">DNI</label>
                <input type="text" />
              </div>

              <div className={styles.createTrainer__field}>
                <label htmlFor="">Nacionalidad</label>
                <input type="text" />
              </div>
            </article>

            <article>
              <div className={styles.createTrainer__field}>
                <label htmlFor="">Provincia</label>
                <input type="text" />
              </div>

              <div className={styles.createTrainer__field}>
                <label htmlFor="">Localidad</label>
                <input type="text" />
              </div>
            </article>

            <article>

              <div>
                <label htmlFor="">Numero de licencia</label>
                <input type="text" />
              </div>

            </article>
          </section>
        </section>

        <footer className={styles.createTrainer__footer}>
          <div className={styles.createTrainer__actions}>
            <button>Crear</button>
            <button>Crear a otro</button>
          </div>
        </footer>
      </div>
    </form>
  );
}
