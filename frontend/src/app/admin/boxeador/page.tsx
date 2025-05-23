import { BsSearch} from "react-icons/bs";
import { BoxeadorInfo } from "@/app/data/Boxeador";
import styles from "./boxeador.module.css";
import ListBoxer from "./ListBoxer";
import Link from "next/link";

async function loadBoxeadorAdmin() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/`);
  const data = await res.json();
  return data;
}

export default async function BoxeadorPageAdmin() {
const boxeadores: BoxeadorInfo[] = await loadBoxeadorAdmin();

  return (
    <main>
      <h1 className={styles.link}>
        Admin / <strong>Boxeador</strong>
      </h1>

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
        <article className={styles.search}>
          <form action="">
            <BsSearch />
            <input
              type="search"
              placeholder="Buscar boxeador por nombre o licencia"
            />
          </form>
        </article>

        <article className={styles.createbox}>
          <Link href="./boxeador/crear"> crear boxeador </Link>
        </article>
      </section>

      <section className={styles.boxeador}>
        <article>
          <table className={styles.tabla_boxer}>
            <thead className={styles.tabla_encabezado}>
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

            <tbody className={styles.fila_encabezado}>
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
