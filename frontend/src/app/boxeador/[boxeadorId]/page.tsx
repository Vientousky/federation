import { BoxeadorInfo } from "../../lib/Boxeador";
import { LoadDatadynamic } from "@/app/lib/Data";
import Image from "next/image";
import styles from "./boxeadorDetails.module.css";

async function loadBoxeador(id: string): Promise<BoxeadorInfo> {
  return LoadDatadynamic(`/boxeador/${id}`)
}

export default async function BoxeadorDetail({  params,
}: {
  params: Promise<{ boxeadorId: string }>;
}) {
  const { boxeadorId } = await params;
  const boxeador: BoxeadorInfo = await loadBoxeador(boxeadorId);

  const infoBoxer = [
    { nombre: "Sexo", value: boxeador.sexo },
    { nombre: "Peso", value: boxeador.peso },
    { nombre: "DNI", value: boxeador.dni },
    { nombre: "Licencia Nº", value: boxeador.n_licencia },
    { nombre: "Provincia", value: boxeador.provincia },
    { nombre: "Localidad", value: boxeador.localidad },
    { nombre: "Debutaje", value: boxeador.debutaje },
    { nombre: "Carrera", value: boxeador.carrera },
    { nombre: "División", value: boxeador.divicion },
    { nombre: "Alcance", value: boxeador.alcance },
    { nombre: "Stance", value: boxeador.stance },
  ];

  const estadisticas = [
    {
      titulo: "Victorias",
      total: boxeador.combates_stats.total_victorias,
      kos: "00 KOs",
      clase: styles.victorias,
    },
    {
      titulo: "Derrota",
      total: boxeador.combates_stats.total_derrotas,
      kos: "00 KOs",
      clase: styles.derrotas,
    },

    {
      titulo: "Empate",
      total: boxeador.combates_stats.total_empates,
      kos: null,
      clase: styles.empates,
    },

    {
      titulo: "Sin_dec",
      total: boxeador.combates_stats.total_sin_decision,
      kos: null,
      clase: styles.ns,
    },
  ];

  return (
    <main className={styles.boxeador}>
      <section className={styles.profile}>
        <figure className={styles.profile__img}>
          <Image
            src={boxeador.boxer_foto || "/img/default.jpeg"}
            alt={boxeador.nombre}
            width={480}
            height={300}
          />

          <figcaption className={styles.figcaption}>
            <h2>
              {boxeador.nombre} {boxeador.apellido}
            </h2>
            <p className={boxeador.status}>{boxeador.status}</p>
          </figcaption>
        </figure>

        <div className={styles.profile__entrenador}>
          <h2 className={styles.descrition}>Entrenador</h2>

        </div>

        <div className={styles.profile__info}>
          {infoBoxer.map((item, index) => (
            <article key={index} className={styles.BoxeadorInfo__item}>
              <span>{item.nombre}: </span>
              <span>{item.value}</span>
            </article>
          ))}
        </div>

        <div className={styles.profile__stats}>
          {estadisticas.map((stat, index) => (
            <article
              key={index}
              className={`${styles.card} ${stat.clase}`}
            >
              <h3>{stat.titulo}</h3>
              <h1>{stat.total}</h1>
              {stat.kos && <p>{stat.kos}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <table className={styles.combates}>
          <caption className={styles.combat_boxer}>
            Boxeador profesional - 58 combates
          </caption>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Peso (kg)</th>
              <th>Nombre</th>
              <th>Lugar</th>
              <th>Resultado</th>
              <th>Rounds</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </section>
    </main>
  );
}
