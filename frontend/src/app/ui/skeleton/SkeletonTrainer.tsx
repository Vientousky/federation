import stylesTrainer from "@/app/components/entrenador/entrenador.module.css";
import styles from "./index.module.css";

export default function SkeletonTrainer() {
  return (
    <article className={stylesTrainer.entrenador}>
      <header className={stylesTrainer.header}>
        <section className={stylesTrainer.header_foto}>
          <figure className={stylesTrainer.foto}>
            <div
              className={`${styles.skeleton} ${styles.avatar_trainer}`}
            ></div>
          </figure>
        </section>

        <section className={stylesTrainer.header_info}>
          <div className={stylesTrainer.header_info_nombre}>
            <article className={`${stylesTrainer.nombre} ${styles.skeleton} ${styles.text}`}></article>

            <article className={`${stylesTrainer.cargo} ${styles.skeleton} ${styles.text}`}></article>
          </div>
          <div className={stylesTrainer.header_info_items}>
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className={stylesTrainer.card_trainer}>
                <span
                  className={`${styles.skeleton} ${styles.text} ${stylesTrainer.item_nombre}`}
                ></span>
                <span
                  className={`${styles.skeleton} ${styles.text} ${stylesTrainer.item_value}`}
                ></span>
              </article>
            ))}
          </div>
        </section>
      </header>

      <footer className={stylesTrainer.footer}>
        <article className={`${styles.skeleton} ${styles.text}`}></article>
      </footer>
    </article>
  );
}
