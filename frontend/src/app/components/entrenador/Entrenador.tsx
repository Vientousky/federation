import { TrainerInfo } from "@/app/lib/Entrenador";
import Image from "next/image";
import Link from "next/link";
import { BsChevronDoubleRight } from "react-icons/bs";
import styles from "./entrenador.module.css";

type TrainerProps = {
  trainer: TrainerInfo;
  link: string;
};

export default function Entrenador({ trainer, link }: TrainerProps) {
  const dataTrainer = [
    { nombre: "Sexo", value: trainer.sexo },
    { nombre: "DNI", value: trainer.dni },
    { nombre: "Licencia Nº", value: trainer.n_licencia },
    { nombre: "Provincia", value: trainer.provincia },
    { nombre: "Vencimiento", value: trainer.vencimiento },
  ];

  return (
    <article className={styles.entrenador}>
      {/* aparte superios de la card */}
      <header className={styles.header}>
        <section className={styles.header_foto}>
          <figure className={styles.foto}>
            <Image
              src={trainer.trainer_foto || "/img/default.jpeg"}
              alt={trainer.nombre}
              width={125}
              height={125}
              style={{ viewTransitionName: trainer.apellido }}
            />
          </figure>
        </section>

        <section className={styles.header_info}>
          <div className={styles.header_info_nombre}>
            <h2 className={styles.nombre}>
              {trainer.nombre} {trainer.apellido}
            </h2>
            <span className={styles.cargo}>{trainer.cargo}</span>
          </div>

          <div className={styles.header_info_items}>
            {dataTrainer.map((item, index) => (
              <article key={index} className={styles.card_trainer}>
                <span className={styles.item_nombre}>{item.nombre}:</span>
                <span className={styles.item_value}>
                  {item.value || "No disponible"}
                </span>
              </article>
            ))}
          </div>
        </section>
      </header>

      <footer className={styles.footer}>
        <div className={styles.footer_localidad}>
          <h2>{trainer.localidad}</h2>
        </div>

        <div className={styles.footer_link}>
          <Link href={link}>
            <span>ir al perfil</span>
            <BsChevronDoubleRight />
          </Link>
        </div>
      </footer>
    </article>
  );
}
