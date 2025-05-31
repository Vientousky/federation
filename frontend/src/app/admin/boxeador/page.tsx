import { BoxeadorInfo } from "@/app/data/Boxeador";
import SearchAndCreate from "../components/SearchAndCreate";
import stylesTables from "@/app/styles/table.module.css";
import styles from "./boxeador.module.css";
import ListBoxer from "./ListBoxer";
async function loadBoxeadorAdmin() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/`);
  const data = await res.json();
  return data;
}

export default async function BoxeadorPageAdmin() {
const boxeadores: BoxeadorInfo[] = await loadBoxeadorAdmin();

  return (
    <main>
      <section className={styles.datos}>
        <h2 className={styles.registrados}>
          Boxeadores registrados totales 1350
        </h2>

        <div className={styles.stact}>
          <article className={`${styles.item} ${styles.activo} `}>
            <h3>Activos</h3>
            <p>1000</p>
          </article>

          <article className={`${styles.item} ${styles.inactivo} `}>
            <h3>Inactivo</h3>
            <p>200</p>
          </article>

          <article className={`${styles.item} ${styles.suspendido} `}>
            <h3>Suspendido</h3>
            <p>50</p>
          </article>

          <article className={`${styles.item} ${styles.pendiente} `}>
            <h3>Pendiente</h3>
            <p>100</p>
          </article>
        </div>
      </section>

      <section className={styles.manageBoxers}>
        <SearchAndCreate href="./boxeador/crear" name="Crear Boxeador" placeholder="Busca un boxeador"/>
      </section>

      <section className={styles.boxeador}>
        <article>
          <table className={stylesTables.table}>
            <thead className={stylesTables.T_encabezado}>
              <tr>
                <th>ID</th>
                <th>Boxeador</th>
                <th>sexo</th>
                <th>Licencia</th>
                <th>Localidad</th>
                <th>Combates</th>
                <th>estado</th>
                <th>Editar</th>
              </tr>
            </thead>

            <tbody className={stylesTables.T_cuerpo}>
              {boxeadores.map((boxeador) => (
               <ListBoxer boxeador={boxeador} key={boxeador.id} />
              ))}
            </tbody>
          </table>
        </article>

        <article className={styles.paginacion}>
          <button>&laquo;</button>
          <button className={styles.activa}>1</button>
          <button>2</button>
          <button>3</button>
          <button>&raquo;</button>
        </article>
      </section>
    </main>
  );
}