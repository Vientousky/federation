import { TrainerInfo } from "@/app/lib/Entrenador";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import styles from "./entrenador.module.css";

type TrainerProps = {
  trainer: TrainerInfo;
  showLink?: boolean;
};

export default function Entrenador({
  trainer,
  showLink = false,
}: TrainerProps) {
  const dataTrainer = [
    { name: "Sexo", value: trainer.sexo },
    { name: "DNI", value: trainer.dni },
    { name: "Licencia Nº", value: trainer.licencia },
    { name: "Vencimiento", value: trainer.vencimiento },
  ];

  return (
    <article className={styles.trainerWrapper}>
      <header className={styles.header}>
        <figure className={styles.headerFoto}>
          <Image
            src={trainer.foto_entrenador || "/img/default.jpeg"}
            alt={trainer.nombre}
            width={125}
            height={125}
          />
        </figure>

        <section className={styles.headerData}>
          <div className={styles.dataIdentification}>
            <h2 className={styles.fullName}>
              {trainer.nombre} {trainer.apellido}
            </h2>
            <p className={styles.charge}>{trainer.cargo}</p>
          </div>

          <div className={styles.dataGeneral}>
            {dataTrainer.map((item, index) => (
              <article key={index} className={styles.cardTrainer}>
                <span className={styles.itemName}>{item.name}:</span>
                <span className={styles.itemValue}>
                  {item.value || "No disponible"}
                </span>
              </article>
            ))}
          </div>
        </section>
      </header>

      <footer
        className={clsx(
          styles.footer,
          showLink ? styles.footerWithLink : styles.footerNoLink
        )}
      >
        <div>
          <h2>{trainer.provincias} </h2>
          <p>{trainer.localidad}</p>
        </div>

        {showLink && (
          <div>
            <Link
              href={`/entrenador/${trainer.id}`}
              className={styles.linkPerfil}
            >
              Ver perfil
            </Link>
          </div>
        )}
      </footer>
    </article>
  );
}
