import styles from "./sponsor.module.css"

export default function Sponsort() {

    return (
        <section className={styles.sponsort} >
            <h1 className={styles.sponsort_title} >Patrocinadores</h1>
            <p  className={styles.sponsort_subtitle}>Estos patrocinadores son de pruebas</p>

            <div className={styles.sponsort_container}>
                <article className={`${styles.sponsort_item } card_color `}>

                </article>

                <article className={`${styles.sponsort_item } card_color `}>

                </article>

                <article className={`${styles.sponsort_item } card_color `}>

                </article>

                <article className={`${styles.sponsort_item } card_color `}>

                </article>

                <article className={`${styles.sponsort_item } card_color `}>

                </article>
            </div>
        </section>
    )
}