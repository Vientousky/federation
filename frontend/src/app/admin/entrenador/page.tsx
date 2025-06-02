import SearchAndCreate from "../components/SearchAndCreate";
import stylesTables from "@/app/styles/table.module.css";
import ListTrainer from "./ListTrainer";
import { TrainerInfo } from "@/app/data/Entrenador";
import styles from "./trainer.module.css";

async function loadTrainerAdmin() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export default async function EntrenadorPageAdmin() {
  const trainer: TrainerInfo[] = await loadTrainerAdmin();
  const total = trainer.length;

  const cargos = trainer.reduce<Record<string, number>>((acc, actual) => {
    acc[actual.cargo] = (acc[actual.cargo] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className={styles.trainerPanel}>
      {/* Panel de métricas de entrenadores */}
      <section className={styles.chargesPanel}>
        <article className={styles.chargeItemTotal}>
          <h1>Entrenadores Totales</h1>
          <p>{total}</p>
        </article>

        <div className={styles.chargesList}>
          {Object.entries(cargos).map(([cargo, cantidad]) => (
            <article className={styles.chargeItem} key={cargo}>
              <h1>{cargo}</h1>
              <p>{cantidad}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Panel de busqueda y creacion de entrenadores */}
      <section className={styles.managePanel}>
        <SearchAndCreate
          href="./entrenador/crear"
          name="Crear entrenador"
          placeholder="Buscar por nombre y apellido o N° de licencia"
        />
      </section>

      {/* Lista de entrenadores */}
      <section className={stylesTables.trainerListPanel}>
        <table className={stylesTables.table}>
          <thead className={stylesTables.T_encabezado}>
            <tr>
              <th>ID</th>
              <th>Entrenador</th>
              <th>Cargo</th>
              <th>DNI</th>
              <th>Nº licencia</th>
              <th>Vencimiento</th>
              <th>Localidad</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody className={stylesTables.T_cuerpo}>
            {trainer.map((trainer) => (
              <ListTrainer key={trainer.id} trainer={trainer} />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
