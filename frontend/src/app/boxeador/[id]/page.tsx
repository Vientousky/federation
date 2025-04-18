// app/boxeador/[id]/page.tsx

import Image from "next/image";
import styles from "./index.module.css";
import { Boxer } from "./types";

async function loadBoxer(id: string): Promise<Boxer> {
  const res = await fetch(`${process.env.BACKEND_URL}/boxeador/${id}/`, {
    cache: "no-store", // opcional para evitar cache
  });

  if (!res.ok) {
    console.error(`Error ${res.status} al cargar boxeador con ID: ${id}`);
    throw new Error("No se pudo cargar el boxeador.");
  }

  return res.json();
}

type PageProps = {
  params: {
    id: string;
  };
};

export default async function BoxerPage({ params }: PageProps) {
  const data = await loadBoxer(params.id);

  const infoBoxer = [
    { nombre: "Sexo", value: data.sexo },
    { nombre: "Peso", value: data.peso },
    { nombre: "DNI", value: data.dni },
    { nombre: "Numero Licencia", value: data.numero_licencia },
    { nombre: "Nacionalidad", value: data.nacionalidad },
    { nombre: "Provincia", value: data.provincia },
    { nombre: "Localidad", value: data.localidad },
    { nombre: "Debutaje", value: data.debutaje },
    { nombre: "Carrera", value: data.carrera },
    { nombre: "División", value: data.divicion },
    { nombre: "Combates", value: data.combates },
    { nombre: "Rounds", value: data.rounds },
    { nombre: "KOs", value: data.KOs },
    { nombre: "Alcance", value: data.alcance },
    { nombre: "Stance", value: data.stance },
  ];

  return (
    <main>
      <section>
        <div>
          <article>
            <h3>Victorias</h3>
            <h1>00</h1>
            <p>00 KOs</p>
          </article>

          <article>
            <h3>Derrotas</h3>
            <h1>00</h1>
            <p>00 KOs</p>
          </article>

          <article>
            <h3>Empates</h3>
            <h1>00</h1>
          </article>

          <article>
            <h3>Sin decisión</h3>
            <h1>00</h1>
          </article>
        </div>

        <figure>
          <Image
            src={data.foto || "/img/default.jpg"}
            alt={data.nombre || "default"}
            width={200}
            height={200}
          />
          <figcaption>
            <h1>
              {data.nombre} {data.apellidos}
            </h1>
            <p className={styles[data.status]}>{data.status}</p>
          </figcaption>
        </figure>

        <div>
          {infoBoxer.map((item, index) => (
            <article key={index}>
              <h3>{item.nombre}</h3>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
