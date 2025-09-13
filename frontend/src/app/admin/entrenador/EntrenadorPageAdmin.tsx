"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { TrainerInfo, TrainerStatistics } from "@/app/lib/Entrenador";
import { LoadData, FetchSearch, FetchInvoicesPages } from "@/app/lib/Data";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import ListTrainer from "./ListTrainer";
import Search from "@/app/components/search/Search";
import Pagination from "@/app/components/pagination/Pagination";
import CrearLink from "../components/CreateLink/CrearLink";
import TableSkeleton from "@/app/ui/skeleton/SkeletonTable";
import stylesTables from "@/app/styles/table.module.css";
import styles from "./trainer.module.css";

export default function EntrenadorPageAdmin() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [isLoading, setIsLoading] = useState(true);
  const [trainers, setTrainers] = useState<TrainerInfo[]>([]);
  const [allTrainer, setAllTrainer] = useState<TrainerStatistics | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  // Actualiza la URL al cambiar la búsqueda
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
    const fetchAllTrainer = async () => {
      try {
        const data = await LoadData("/entrenador/estadisticas/");
        setAllTrainer(data);
      } catch (err) {
        console.error("Error al cargar todos los entrenadores", err);
      }
    };
    fetchAllTrainer();
  }, []);

  const data = [
    { cargo: "Director Tecnico", value: allTrainer?.cargos.director_tecnico },
    {
      cargo: "Entrenador Principal",
      value: allTrainer?.cargos.entrenador_principal,
    },
    { cargo: "Preparador Físico", value: allTrainer?.cargos.preparador_fisico },
    {
      cargo: "Segundo Entrenador",
      value: allTrainer?.cargos.segundo_entrenador,
    },
    { cargo: "Cutman", value: allTrainer?.cargos.cutman },
    { cargo: "Nutricionista", value: allTrainer?.cargos.nutricionista },
    { cargo: "Psicologo", value: allTrainer?.cargos.psicologo },
    { cargo: "Manager", value: allTrainer?.cargos.manager },
    { cargo: "Asistente tecnico", value: allTrainer?.cargos.asistente_tecnico },
    { cargo: "Kinesiologo", value: allTrainer?.cargos.kinesiologo },
    { cargo: "Sparring", value: allTrainer?.cargos.sparring },
    { cargo: "Analista", value: allTrainer?.cargos.analista },
  ];

  const COLORS = [
    "rgb(50, 180, 80)",
    "rgb(66, 135, 245)",
    "rgb(245, 190, 40)",
    "rgb(220, 60, 70)",
    "rgb(210, 110, 30)",
    "rgb(140, 80, 200)",
    "rgb(100, 200, 200)",
    "rgb(90, 90, 90)",
    "rgb(255, 120, 180)",
    "rgb(0, 150, 130)",
    "rgb(200, 200, 70)",
    "rgb(180, 60, 150)",
  ];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await FetchSearch("/entrenador/", query, page);
          setTrainers(data.results);

          const pages = await FetchInvoicesPages(query, "/entrenador");
          setTotalPages(pages);
        } catch (err) {
          console.error("Error al buscar entrenadores", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, page]);

  return (
    <main className={styles.trainerPanel}>
      <section className={styles.trainersOverview}>
        <div className={styles.chartContainers}>
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

          <h1>{allTrainer?.total_entrenador}</h1>
          <p>total de boxeadores</p>
        </div>

        <div className={styles.statsList}>
          {data.map((item, index) => (
            <article key={index} className={`${styles.statsItem}`}>
              <h1>{item.value}</h1>
              <p>{item.cargo} </p>
            </article>
          ))}
        </div>
      </section>

      {/* Lista de entrenadores */}
      <section className={stylesTables.trainer_list_panel}>
        <header className={stylesTables.control_panel}>
          <p>Entrenadores Recientes</p>

          <article className={stylesTables.panel_actions}>
            <Search
              onChange={handleQueryChange}
              placeholder="Busca a entrenador por: nombre, N°Licencia"
            />

            <button disabled className={stylesTables.btn}>
              ordenar
            </button>

            <CrearLink
              href="./entrenador/crear"
              name="Crear Entrenador"
              label="Creación de Entrenador"
            />
          </article>
        </header>

        <table className={stylesTables.table}>
          <thead className={stylesTables.T_encabezado}>
            <tr>
              <th>ID</th>
              <th>Entrenador</th>
              <th>DNI</th>
              <th>Cargo</th>
              <th>Nº licencia</th>
              <th>Vencimiento</th>
              <th>Provincia</th>
              <th>Localidad</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody className={stylesTables.T_cuerpo}>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <TableSkeleton key={i} />)
            ) : trainers.length > 0 ? (
              trainers.map((trainer) => (
                <ListTrainer key={trainer.id} trainer={trainer} />
              ))
            ) : (
              <>
                <tr>
                  <td colSpan={8}></td>
                </tr>
                <tr className={stylesTables.NoEncontrado}>
                  <td colSpan={8}>
                    Entrenador que buscaba no se ha encontrado
                  </td>
                </tr>
                <tr className={stylesTables.NoEncontrado}>
                  <td colSpan={8}>Por favor introduzca otro término</td>
                </tr>
                <tr>
                  <td colSpan={8}></td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <footer className={stylesTables.navigation_footer}>
          <Pagination totalPages={totalPages} />
        </footer>
      </section>
    </main>
  );
}
