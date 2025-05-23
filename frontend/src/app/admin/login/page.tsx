import styles from "./login.module.css"
import Image from "next/image";

export default function LoginAdmin() {

  return (
    <section className={styles.adminLogin}>
      <figure className={styles.login_left}>
        <Image
          src="/img/official.jpeg"
          alt="imagen del login"
          width={800}
          height={1000}
        />
      </figure>

      <article className={styles.login_right}>
        <div className={styles.rightPrecentacion}>
          <h1>Ante de empezar Inicie Seción</h1>
        </div>

        <form action="" className={styles.rightForm}>
          <div className={styles.item}>
            <label htmlFor="">Usuario</label>
            <input type="text" />
          </div>

          <div className={styles.item}>
            <label htmlFor="">Contraseña</label>
            <input type="password" />
          </div>

          <button type="button">Iniciar seción</button>
        </form>
      </article>
    </section>
  );
}
