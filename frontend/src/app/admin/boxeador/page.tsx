"use client"

import { useState, useEffect } from "react";
import {useRouter, usePathname, useSearchParams } from "next/navigation";

import { BoxeadorInfo } from "@/app/lib/Boxeador";
import { FetchSearch, FetchInvoicesPages } from "@/app/lib/Data";
import ListBoxer from "./ListBoxer";
import Search from "@/app/components/search/Search";
import Pagination from "@/app/components/pagination/Pagination";
import CrearLink from "../components/CreateLink/CrearLink";
import TableSkeleton from "@/app/ui/skeleton/TableSkeleton";
import stylesTables from "@/app/styles/table.module.css";
import styles from "./boxeador.module.css";

export default function BoxeadorPageAdmin() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [isLoading, setIsLoading] = useState(true);
  const [boxers, setBoxers] = useState<BoxeadorInfo[]>([]);
  const [totalPages, setTotalPages] = useState(1)

  const handleQueryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    params.set("page", "1"); // Reiniciar a página 1 al cambiar búsqueda
    router.push(`${pathname}?${params.toString()}`);
  };


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await FetchSearch("/boxeador", query, page);
          setBoxers(data.results);

          const pages = await FetchInvoicesPages(query, "/boxeador")
          setTotalPages(pages)
        } catch (err) {
          console.error("Error fetching boxers", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, page]);

  return (
    <main className={styles.boxerPanel}>
      <section className={styles.chargesPanel}>
        <article className={`${styles.chargesItem}`}>
          <h2>Total de Boxeador</h2>
          <p>2500</p>
        </article>

        <article className={`${styles.chargesItem} ${styles.activo}`}>
          <h2>Activo</h2>
          <p>2000</p>
        </article>

        <article className={`${styles.chargesItem} ${styles.inactivo}`}>
          <h2>Inactivo</h2>
          <p>250</p>
        </article>

        <article className={`${styles.chargesItem} ${styles.suspendido}`}>
          <h2>Suspendido</h2>
          <p>100</p>
        </article>

        <article className={`${styles.chargesItem} ${styles.retirado}`}>
          <h2>Retirado</h2>
          <p>150</p>
        </article>
      </section>

      <section className={styles.managePanel}></section>

      <section className={stylesTables.trainer_list_panel}>
        <div className={stylesTables.control_panel}>
          <p>Boxeadores Recientes</p>

          <article className={stylesTables.panel_actions}>
            <Search
              onChange={handleQueryChange}
              placeholder="Busca a boxeador por: nombre apellido o N°Licencia"
            />

            <button disabled className={stylesTables.btn}>
              ordenar
            </button>

            <CrearLink
              href="/boxeador/crear"
              name="Crear Boxeador"
              label="Creación de Boxeador"
            />
          </article>
        </div>

        <table className={stylesTables.table}>
          <thead className={stylesTables.T_encabezado}>
            <tr>
              <th>ID</th>
              <th>Boxeador</th>
              <th>Sexo</th>
              <th>Nº licencia</th>
              <th>Localidad</th>
              <th>Combates</th>
              <th>Estatus</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody className={stylesTables.T_cuerpo}>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableSkeleton key={i} />
                ))
              : boxers.length > 0
              ? boxers.map((trainer) => (
                  <ListBoxer key={trainer.id} boxeador={trainer} />
                ))
              : !isLoading && (
                  <>
                    <tr>
                      <td colSpan={8}></td>
                    </tr>

                    <tr className={stylesTables.NoEncontrado}>
                      <td colSpan={8}>
                        Entrenador que buscaba no se a encontrado
                      </td>
                    </tr>

                    <tr className={stylesTables.NoEncontrado}>
                      <td colSpan={8}>Por favor introdusca otro</td>
                    </tr>

                    <tr>
                      <td colSpan={8}></td>
                    </tr>
                  </>
                )}
          </tbody>
        </table>

        <div className={stylesTables.navigation_footer}>
          <Pagination totalPages={totalPages}/>
        </div>
      </section>
    </main>
  );
}
