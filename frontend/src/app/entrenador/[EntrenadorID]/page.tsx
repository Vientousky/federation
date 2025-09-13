import { TrainerInfo } from "@/app/lib/Entrenador";
import { LoadDatadynamic } from "@/app/lib/Data";

import Image from "next/image";
import styles from "./trainer.module.css";

type TrainerProps = {
  name: string;
  value: string | number | undefined;
};

async function loadTrainer(id: string): Promise<TrainerInfo> {
  return LoadDatadynamic(`/entrenador/${id}`);
}

export default async function TrainerDetail({
  params,
}: {
  params: Promise<{ EntrenadorID: string }>;
}) {
  const { EntrenadorID } = await params;
  const trainer: TrainerInfo = await loadTrainer(EntrenadorID);

  const dataTrainer: TrainerProps[] = [
    { name: "Sexo", value: trainer.sexo },
    { name: "Nombre", value: trainer.dni },
    { name: "Licencia", value: trainer.licencia },
    { name: "Vencimiento", value: trainer.vencimiento },
    { name: "Provincia", value: trainer.provincias },
    { name: "Localidad", value: trainer.localidad },
  ];

  return (
    <main className={styles.trainerWrapper}>
      <div className={styles.trainerProfileContainer}>
        <figure className={styles.headerContainer}>
          <Image
            src="/img/logo.webp"
            alt="Federacion chaqueña boxeo"
            width={66}
            height={46}
            className={styles.logo}
          />
          <figcaption className={styles.slema}>
            <h1 className={styles.title}>Licencia provincial de Entrenador</h1>
            <p className={styles.subtitle}>Federación Chaqueña de Box</p>
          </figcaption>
        </figure>

        <section className={styles.bodyContainer}>
          <figure className={styles.containerImg}>
            <Image
              src={trainer.foto_entrenador || "/img/default.jpeg"}
              alt={trainer.nombre}
              width={350}
              height={350}
            />
          </figure>

          <article className={styles.containerData}>
            <section className={styles.dataIdentification}>
              <h2 className={styles.fullName}>
                {trainer.nombre} {trainer.apellido}
              </h2>
              <p className={styles.charge}>{trainer.cargo}</p>
            </section>

            <section className={styles.dataGeneral}>
              {dataTrainer.map((item, index) => (
                <article key={index} className={styles.cardTrainer}>
                  <span className={styles.itemName}>{item.name}:</span>
                  <span className={styles.itemValue}>
                    {item.value || "No disponible"}
                  </span>
                </article>
              ))}
            </section>
          </article>
        </section>

        <footer className={styles.footerCotaniner}>
          <h2>Emitido por la Federación Chaqueña de Boxeo</h2>
          <p>Registro oficial - Año {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  );
}
