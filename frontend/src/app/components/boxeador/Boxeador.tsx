import { BoxeadorInfo } from "@/app/lib/Boxeador";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styles from "./boxeador.module.css";

type BoxerProps = {
  boxer: BoxeadorInfo;
  showLink?: boolean;
};
export default function Boxeador({ boxer, showLink = false }: BoxerProps) {
  const dataTrainer = [
    { name: "Sexo", value: boxer.sexo },
    { name: "DNI", value: boxer.dni },
    { name: "Licencia Nº", value: boxer.licencia },
    { name: "Vencimiento", value: boxer.vencimiento },
  ];

  const combatBoxer = [
    { name: "Vitoria", value: 0 },
    { name: "Derrotas", value: 0 },
    { name: "Empates", value: 0 },
    { name: "Sin decision", value: 0 },
  ];

  return (
    <div className={styles.boxerCard}>
      <header className={styles.header}>
        <figure className={styles.headerFoto}>
          <Image
            src={boxer.foto_boxeador || "/img/default.jpeg"}
            alt={boxer.nombre}
            width={125}
            height={125}
          />

          <figcaption className={styles.figcaption}>
            <ul>
              {combatBoxer.map((item, index) => (
                <li key={index} className={styles.item}>
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>

        <section className={styles.headerData}>
          <div className={styles.dataIdentification}>
            <h2 className={styles.fullName}>
              {boxer.nombre} {boxer.apellido}
            </h2>
            <p className={styles.charge}>{boxer.sexo}</p>
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
          <h2>{boxer.provincias} </h2>
          <p>{boxer.localidad}</p>
        </div>

        {showLink && (
          <div>
            <Link href={`/boxeador/${boxer.id}`} className={styles.linkPerfil}>
              Ver perfil
            </Link>
          </div>
        )}
      </footer>
    </div>
  );
}
