import stylesTrainer from "@/app/components/entrenador/entrenador.module.css";
import styles from "./index.module.css";

export default function SkeletonTrainer() {
  return (
    <article className={stylesTrainer.trainerWrapper}>
      <header className={stylesTrainer.header}>
        <section className={stylesTrainer.headerFoto}>
          <div className={`${styles.skeleton} ${styles.avatar_trainer}`}></div>
        </section>

        <section className={stylesTrainer.headerData}>
          <div className={stylesTrainer.dataIdentification}>
            <article
              className={`${stylesTrainer.fullName} ${styles.skeleton} ${styles.textTop}`}
            ></article>

            <article
              className={`${stylesTrainer.charge} ${styles.skeleton} ${styles.textBottom}`}
            ></article>
          </div>
          <div className={stylesTrainer.dataGeneral}>
            {Array.from({ length: 4 }).map((_, index) => (
              <article key={index} className={stylesTrainer.cardTrainer}>
                <span
                  className={`${styles.skeleton} ${styles.textTop} ${stylesTrainer.itemName}`}
                ></span>
                <span
                  className={`${styles.skeleton} ${styles.text} ${stylesTrainer.itemValue}`}
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
