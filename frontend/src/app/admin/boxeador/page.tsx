"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BoxeadorInfo } from "@/app/data/Boxeador";
import {FetchSearch } from "@/app/data/Data";
import ListBoxer from "./ListBoxer";
import Search from "@/app/components/search/Search";
import CrearLink from "../components/CreateLink/CrearLink";
import styles from "./boxeador.module.css";
import stylesTables from "@/app/styles/table.module.css";
import TableSkeleton from "@/app/ui/skeleton/TableSkeleton";

export default function BoxeadorPageAdmin() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [boxers, setBoxers] = useState<BoxeadorInfo[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await FetchSearch("/boxeador", query, 1);
          setBoxers(data);
        } catch (err) {
          console.error("Error fetching boxers", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query, setQuery]);

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

      <section className={styles.managePanel}>
        <Search
          onChange={setQuery}
          placeholder="Busca a boxeador por: nombre apellido o N°Licencia"
        />
        <CrearLink
          href="/boxeador/crear"
          name="Crear Boxeador"
          label="Creación de Boxeador"
        />
      </section>

      <section className={styles.boxerListPanel}>
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
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <TableSkeleton key={i} />)
            ) : boxers.length > 0 ? (
              boxers.map((trainer) => (
                <ListBoxer key={trainer.id} boxeador={trainer} />
              ))
            ) : !isLoading && (
              <>
                <tr>
                  <td colSpan={8}></td>
                </tr>

                <tr className={stylesTables.NoEncontrado}>
                  <td colSpan={8}>Entrenador que buscaba no se a encontrado</td>
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
      </section>
    </main>
  );
}
