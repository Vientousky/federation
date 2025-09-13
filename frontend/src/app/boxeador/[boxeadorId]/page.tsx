import { BoxeadorInfo } from "../../lib/Boxeador";
import { TrainerInfo } from "@/app/lib/Entrenador";
import { LoadDatadynamic } from "@/app/lib/Data";

import clsx from "clsx";
import Entrenador from "@/app/components/entrenador/CardEntrenador";
import Image from "next/image";
import stylesTables from "@/app/styles/table.module.css";
import styles from "./boxeadorDetails.module.css";

async function loadBoxeador(id: string): Promise<BoxeadorInfo> {
  return LoadDatadynamic(`/boxeador/${id}`);
}

async function loadEntrenador(id: number): Promise<TrainerInfo> {
  return LoadDatadynamic(`/entrenador/${id}`);
}

export default async function BoxeadorDetail({
  params,
}: {
  params: Promise<{ boxeadorId: string }>;
}) {
  const { boxeadorId } = await params;
  const boxeador: BoxeadorInfo = await loadBoxeador(boxeadorId);
  const entrenador: TrainerInfo | null = boxeador.entrenador
    ? await loadEntrenador(Number(boxeador.entrenador))
    : null;

  const infoBoxer = [
    { name: "Nacimiento", value: boxeador.nacimiento },
    { name: "DNI", value: boxeador.dni },
    { name: "N° Licencia", value: boxeador.licencia },
    { name: "Vencimiento", value: boxeador.vencimiento },
    { name: "Provincia", value: boxeador.provincias },
    { name: "Localidad", value: boxeador.localidad },
    { name: "Peso en Kilos", value: boxeador.peso },
    { name: "División", value: boxeador.division },
    { name: "Altura en CM", value: boxeador.altura },
    { name: "Alcance en CM", value: boxeador.alcance },
    { name: "Postura de combate", value: boxeador.postura_combate },
  ];

  return (
    <main className={styles.profileWrapper}>
      <section className={styles.profile}>
        <figure className={styles.profileImg}>
          <figcaption className={styles.profileIndetification}>
            <h2>
              {boxeador.nombre} {boxeador.apellido}
            </h2>

            <ul>
              <li
                className={clsx(
                  styles.estado,
                  boxeador.estado === "Activo" && styles.activo,
                  boxeador.estado === "Inactivo" && styles.inactivos,
                  boxeador.estado === "Suspendido" && styles.suspendidos,
                  boxeador.estado === "Retirado" && styles.retirados
                )}
              >
                {boxeador.estado}
              </li>
              <li
                className={clsx(
                  styles.sexo,
                  boxeador.sexo === "Masculino" && styles.Maculino,
                  boxeador.sexo === "Femenino" && styles.Femenino
                )}
              >
                {boxeador.sexo}
              </li>
            </ul>
          </figcaption>
          <Image
            src={boxeador.foto_boxeador || "/img/default.jpeg"}
            alt={boxeador.nombre}
            width={480}
            height={300}
          />
        </figure>

        <div className={styles.profileDetails}>
          <article className={styles.detailsTrainer}>
            {entrenador ? (
              <Entrenador trainer={entrenador} showLink />
            ) : (
              <p>Sin entrenador</p>
            )}
          </article>

          <article className={styles.detailsInfo}>
            {infoBoxer.map((item, index) => (
              <article key={index} className={styles.infoItem}>
                <span className={styles.name}>{item.name}: </span>
                <span className={styles.value}>{item.value}</span>
              </article>
            ))}
          </article>
        </div>
      </section>

      <section className={stylesTables.trainer_list_panel}>
        <header className={styles.control_panel}>
          <h1>Boxeador Profesional - 58</h1>
          <ul>
            <li>Victorias | 40</li>
            <li>Derrotas | 10</li>
            <li>Empates | 8</li>
            <li>Sin desición | 0</li>
          </ul>
        </header>

        <table className={styles.table}>
          <thead className={stylesTables.T_encabezado}>
            <tr>
              <th>Fecha</th>
              <th>Peso (kg)</th>
              <th>Nombre</th>
              <th>Lugar</th>
              <th>Resultado</th>
              <th>Rounds</th>
            </tr>
          </thead>
          <tbody className={stylesTables.T_cuerpo}></tbody>
        </table>
      </section>
    </main>
  );
}
