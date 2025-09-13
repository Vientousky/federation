import { BoxeadorInfo } from "@/app/lib/Boxeador";
import Image from "next/image";
import styles from "./boxeador.module.css";

type BoxerProps = {
  boxer: BoxeadorInfo;
};

export default function Boxeador({ boxer }: BoxerProps) {
  const dataBoxer = [
    { nombre: "DNI", value: boxer.dni },
    { nombre: "N° licencia", value: boxer.n_licencia },
    { nombre: "combates total", value: boxer.combates_stats.total },
    { nombre: "Nocaus", value: boxer.combates_stats.porcentaje_KO },
    { nombre: "Victorias", value: boxer.combates_stats.total_victorias },
    { nombre: "Derrotas", value: boxer.combates_stats.total_derrotas },
    { nombre: "Empates", value: boxer.combates_stats.total_empates },
  ];

  return (
    <article className={`${styles.boxerCard} card_color`}>
      <header className={styles.header}>
        <figure className={styles.headerAvatar}>
          <Image
            className={styles.avatar}
            src={boxer.boxer_foto || "/img/default.jpeg"}
            alt={boxer.apellido}
            width={128}
            height={128}
          />
        </figure>

        <section className={styles.headerInfoBoxer}>
          <div className={styles.BoxerData}>
            <h2>
              {boxer.nombre} {boxer.apellido}
            </h2>
            <p>
              {boxer.localidad}: {boxer.provincia}
            </p>
          </div>

          <div className={styles.HeaderGeneralData}>
            {dataBoxer.map((item, index) => (
              <article key={index} className={styles.item}>
                <span>{item.nombre}: </span>
                <span>{item.value}</span>
              </article>
            ))}
          </div>
        </section>
      </header>

      <footer>
        <h1>desarrollando</h1>
      </footer>
    </article>
  );
}
