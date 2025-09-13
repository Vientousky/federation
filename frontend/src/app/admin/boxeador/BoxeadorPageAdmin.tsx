"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BoxeadorInfo, BoxerStatistics } from "@/app/lib/Boxeador";
import { FetchSearch, FetchInvoicesPages } from "@/app/lib/Data";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import clsx from "clsx";
import ListBoxer from "./ListBoxer";
import Search from "@/app/components/search/Search";
import Pagination from "@/app/components/pagination/Pagination";
import CrearLink from "../components/CreateLink/CrearLink";
import TableSkeleton from "@/app/ui/skeleton/SkeletonTable";
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
  const [allBoxer, setAllBoxer] = useState<BoxerStatistics | null>(null);
  const [totalPages, setTotalPages] = useState(1);

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

          const pages = await FetchInvoicesPages(query, "/boxeador");
          setTotalPages(pages);
        } catch (err) {
          console.error("Error al obtener los boxeadores", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, page]);

  useEffect(() => {
    const fetchAllBoxer = async () => {
      try {
        const data = await FetchSearch("/boxeador/estadisticas/", "", 1);
        setAllBoxer(data);
      } catch (err) {
        console.error("Error al cargar todos los boxeadores", err);
      }
    };
    fetchAllBoxer();
  }, []);

  const data = [
    { name: "Activos", value: allBoxer?.activos },
    { name: "Inactivos", value: allBoxer?.inactivos },
    { name: "Suspendidos", value: allBoxer?.suspendidos },
    { name: "Retirados", value: allBoxer?.retirados },
  ];


  const COLORS = [
    "rgb(50, 180, 80)",   // Activos
    "rgb(245, 190, 40)",  // Inactivos
    "rgb(220, 60, 70)",   // Suspendidos
    "rgb(210, 110, 30)"   // Retirados
  ];

  return (
    <main className={styles.boxersPanel}>
      <section className={styles.boxersOverview}>
        <div className={styles.chartContainer}>
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill={"ffff"}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <h1>{allBoxer?.total_boxeadores}</h1>
          <p>total de boxeadores</p>
        </div>

        <div className={styles.statsList}>
          {data.map((item, index) => (
            <article
              key={index}
              className={clsx(
                styles.statsItem,
                item.name === "Activos" && styles.activos,
                item.name === "Inactivos" && styles.inactivos,
                item.name === "Suspendidos" && styles.suspendidos,
                item.name === "Retirados" && styles.retirados
              )}
            >
              <h1>{item.value}</h1>
              <p>{item.name}</p>
            </article>
          ))}
        </div>
      </section>

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
              href="./boxeador/crear"
              name="Crear Boxeador"
              label="crear de Boxeador"
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
                        Boxeador que buscaba no se a encontrado
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
          <Pagination totalPages={totalPages} />
        </div>
      </section>
    </main>
  );
}
