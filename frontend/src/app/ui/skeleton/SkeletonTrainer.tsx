import stylesTrainer from '@/app/styles/entrenador.module.css'
import styles from './index.module.css'

export default function SkeletonTrainer() {

    return(
        <article className={stylesTrainer.entrenador}>
            <header className={stylesTrainer.header}>
                <figure className={stylesTrainer.foto}>
                    <div className={`${styles.skeleton} ${styles.avatar}`}></div>
                </figure>

                <section className={stylesTrainer.info}>
                    <div className={stylesTrainer.info}>
                        <article className={`${styles.skeleton} ${styles.text}`}>

                        </article>
                    </div>
                    <div className={stylesTrainer.datos}>
                        <article className={`${styles.skeleton} ${styles.text}`}>

                        </article>

                        <article className={`${styles.skeleton} ${styles.text}`}>

                        </article>

                        <article className={`${styles.skeleton} ${styles.text}`}>

                        </article>

                        <article className={`${styles.skeleton} ${styles.text}`}>

                        </article>
                    </div>
                </section>
            </header>

            <footer className={stylesTrainer.footer}>
                <div className={`${styles.skeleton} ${styles.text}`}>

                </div>

                <div className={`${styles.skeleton} ${styles.text}`}>

                </div>
            </footer>
        </article>
    )
}