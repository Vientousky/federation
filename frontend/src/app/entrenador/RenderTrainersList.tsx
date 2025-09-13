"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { FetchSearch, FetchInvoicesPages } from "../lib/Data";
import { TrainerInfo } from "../lib/Entrenador";
import Entrenador from "../components/entrenador/CardEntrenador";
import Pagination from "../components/pagination/Pagination";
import SkeletonTrainer from "../ui/skeleton/SkeletonTrainer";
import Search from "../components/search/Search";
import styles from "./index.module.css";
import stylesTable from "@/app/styles/table.module.css";

export default function RenderTrainersList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [isLoading, setIsLoading] = useState(true);
  const [trainers, setTrainers] = useState<TrainerInfo[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const handleQueryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

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
    <main className={styles.containerPage}>
      <section className={stylesTable.trainer_list_panel}>
        <header className={stylesTable.control_panel}>
          <p>Buscador de Entrenadores</p>

          <article className={stylesTable.panel_actions}>
            <Search
              onChange={handleQueryChange}
              placeholder="Busca entrenador por: nombre apellido N° licencia"
            />

            <button disabled className={stylesTable.btn}>
              ordenar
            </button>
          </article>
        </header>

        <section className={styles.listTrainer}>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonTrainer key={i} />)
          ) : trainers.length > 0 ? (
            trainers.map((trainer) => (
              <Entrenador key={trainer.id} trainer={trainer} showLink />
            ))
          ) : (
            <div className={styles.trainer_not_found}>
              <h2>Entrenador no Encontrado</h2>
              <p>por favor introdusca otro</p>
            </div>
          )}
        </section>

        <footer className={stylesTable.navigation_footer}>
          <Pagination totalPages={totalPages} />
        </footer>
      </section>
    </main>
  );
}
