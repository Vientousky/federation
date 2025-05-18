import { BoxeadorInfo } from "../../data/Boxeador";
import CombatList from "./CombatList";
import Entrenador from "@/app/components/entrenador";
import Image from "next/image";
import styles from "./boxeadorDetails.module.css";

async function loadBoxeador(id: string): Promise<BoxeadorInfo> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/${id}/`
  );
  const data = await res.json();
  return data;
}

export default async function BoxeadorDetail({
  params,
}: {
  params: Promise<{ boxeadorId: string }>;
}) {
  const { boxeadorId } = await params;
  const boxeador: BoxeadorInfo = await loadBoxeador(boxeadorId);

  const infoBoxer = [
    { nombre: "Sexo", value: boxeador.sexo },
    { nombre: "Peso", value: boxeador.peso },
    { nombre: "DNI", value: boxeador.dni },
    { nombre: "Licencia Nº", value: boxeador.numero_licencia },
    { nombre: "Nacionalidad", value: boxeador.nacionalidad },
    { nombre: "Provincia", value: boxeador.provincia },
    { nombre: "Localidad", value: boxeador.localidad },
    { nombre: "Debutaje", value: boxeador.debutaje },
    { nombre: "Carrera", value: boxeador.carrera },
    { nombre: "División", value: boxeador.divicion },
    { nombre: "Combates", value: boxeador.combate },
    { nombre: "Rounds", value: boxeador.rounds },
    { nombre: "KOs", value: boxeador.KOs },
    { nombre: "Alcance", value: boxeador.alcance },
    { nombre: "Stance", value: boxeador.stance },
    { nombre: "Sin desición", value: boxeador.total_sin_decision },
  ];

  const estadisticas = [
    {
      titulo: "Victorias",
      total: boxeador.total_victorias,
      kos: "00 KOs",
      clase: styles.victorias,
    },
    {
      titulo: "Derrota",
      total: boxeador.total_derrotas,
      kos: "00 KOs",
      clase: styles.derrotas,
    },

    {
      titulo: "Empate",
      total: boxeador.total_empates,
      kos: null,
      clase: styles.empates,
    },

    {
      titulo: "Sin_dec",
      total: boxeador.total_sin_decision,
      kos: null,
      clase: styles.ns,
    },
  ];

  console.log(boxeador.foto);

  return (
    <main className={styles.boxeador}>
      <section className={styles.profile}>
        <figure className={styles.profile__img}>
          <Image
            src={
              boxeador.foto
                ? `https://res.cloudinary.com/drmsxwdwy/${boxeador.foto}`
                : "/img/default.jpeg"
            }
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

          <Entrenador />
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
            {boxeador.combates.map((combate, index) => (
              <CombatList key={index} combate={combate} />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
