import { TrainerInfo } from "@/app/data/Entrenador";
import styles from "./trainer.module.css";
import Image from "next/image";

async function loadTrainer(id: string): Promise<TrainerInfo> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/${id}/`
  );
  const data = await res.json();
  return data;
}

export default async function TrainerDetail({
  params,
}: {
  params: Promise<{ EntrenadorID: string }>;
}) {
  const { EntrenadorID } = await params;
  const trainer: TrainerInfo = await loadTrainer(EntrenadorID);

  return (
    <main className={styles.content_trainer}>
      <div className={styles.trainer}>
        <figure className={styles.trainer_logo}>
          <Image
            src="/img/logo.webp"
            alt="Federacion chaqueña boxeo"
            width={66}
            height={46}
            style={{viewTransitionName:trainer.apellido,}}
          />
          <figcaption className={styles.logo_eslogan}>
            <h1>Licencia provincial de Entrenador</h1>
            <p>Federación Chaqueña de Boxeo</p>
          </figcaption>
        </figure>

        <section className={styles.trainer_data}>
          <figure className={styles.trainer_img}>
            <Image
              src={trainer.trainer_foto || "/img/default.jpeg"}
              alt={trainer.nombre}
              width={350}
              height={350}
            />
          </figure>

          <article className={styles.data_content}>
            <section className={styles.content_name}>
                <h2>{trainer.nombre} {trainer.apellido}</h2>
                <p>{trainer.cargo}</p>
            </section>

            <section className={styles.content_personal_data}>
              <div className={styles.data_item}>
                <span className={styles.span1}>DNI: </span>
                <span className={styles.span2}>{trainer.dni}</span>
              </div>

              <div className={styles.data_item}>
                <span className={styles.span1}>Nº licencia: </span>
                <span className={styles.span2}>{trainer.n_licencia}</span>
              </div>

              <div className={styles.data_item}>
                <span className={styles.span1}>Vencimiento: </span>
                <span className={styles.span2}>{trainer.vencimiento}</span>
              </div>

              <div className={styles.data_item}>
                <span className={styles.span1}>Localidad: </span>
                <span className={styles.span2}>{trainer.localidad}</span>
              </div>
            </section>
          </article>
        </section>

        <footer className={styles.trainer_footer}>
          <h2>Emitido por la Federación Chaqueña de Boxeo</h2>
          <p>Registro oficial - Año {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  );
}
