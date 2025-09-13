"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { TrainerInfo, TrainerStatistics } from "@/app/lib/Entrenador";
import { LoadData, FetchSearch, FetchInvoicesPages } from "@/app/lib/Data";
import ListTrainer from "./ListTrainer";
import Search from "@/app/components/search/Search";
import Pagination from "@/app/components/pagination/Pagination";
import CrearLink from "../components/CreateLink/CrearLink";
import TableSkeleton from "@/app/ui/skeleton/TableSkeleton";
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

  const cargos = [
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
      <div>
        <h2 className={styles.title}>Resumen de los entrenador</h2>
        <p className={styles.depcrition}>
          Total: {allTrainer?.total_entrenador}
        </p>
      </div>

      {/* Panel de métricas */}
      <section className={styles.chargesPanel}>
        {cargos.map((item, index) => (
          <article key={index} className={`${styles.chargeItem} card_color`}>
            <h3>{item.cargo}</h3>
            <p>{item.value} </p>
          </article>
        ))}
      </section>

      {/* Lista de entrenadores */}
      <section className={stylesTables.trainer_list_panel}>
        <div className={stylesTables.control_panel}>
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
              href="/entrenador/crear"
              name="Crear Entrenador"
              label="Creación de Entrenador"
            />
          </article>
        </div>

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

        <div className={stylesTables.navigation_footer}>
          <Pagination totalPages={totalPages} />
        </div>
      </section>
    </main>
  );
}
