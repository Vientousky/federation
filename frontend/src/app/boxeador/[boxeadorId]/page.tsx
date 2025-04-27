import { BoxeadorInfo } from "./interface";
import Entrenador from "@/app/components/entrenador";
import Image from "next/image";
import styles from "./index.module.css";

async function loadBoxeador(id: string): Promise<BoxeadorInfo> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/${id}/`);
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
    { nombre: "Num_Lic", value: boxeador.numero_licencia },
    { nombre: "Nacionalidad", value: boxeador.nacionalidad },
    { nombre: "Provincia", value: boxeador.provincia },
    { nombre: "Localidad", value: boxeador.localidad },
    { nombre: "Debutaje", value: boxeador.debutaje },
    { nombre: "Carrera", value: boxeador.carrera },
    { nombre: "División", value: boxeador.divicion },
    { nombre: "Combates", value: boxeador.combates },
    { nombre: "Rounds", value: boxeador.rounds },
    { nombre: "KOs", value: boxeador.KOs },
    { nombre: "Alcance", value: boxeador.alcance },
    { nombre: "Stance", value: boxeador.stance },
  ];

  return (
    <main className={styles.boxeador}>
      <section className={styles.profile}>
        <figure className={styles.profile__img}>
          <Image
            src="/img/default.jpeg"
            alt="default"
            width={480}
            height={300}
          />
          <figcaption className={styles.caption}>
            <h2>
              {boxeador.nombre} {boxeador.apellido}
            </h2>
            <p className={styles[boxeador.status]}>{boxeador.status}</p>
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
          <article className={`${styles.card} ${styles.victorias}`}>
            <h3>Victorias</h3>
            <h1>00</h1>
            <p>00 KOs</p>
          </article>

          <article className={`${styles.card} ${styles.derrotas}`}>
            <h3>Derrota</h3>
            <h1>00</h1>
            <p>00 KOs</p>
          </article>

          <article className={`${styles.card} ${styles.empates}`}>
            <h3>Empates</h3>
            <h1>00</h1>
            <p>00 KOs</p>
          </article>
        </div>
      </section>
    </main>
  );
}
