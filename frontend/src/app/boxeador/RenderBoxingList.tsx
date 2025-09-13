"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FetchSearch, FetchInvoicesPages } from "../lib/Data";
import { BoxeadorInfo } from "../lib/Boxeador";

import Boxeador from "../components/boxeador/Boxeador";
import BoxerSkeleton from "../ui/skeleton/SkeletonBoxer";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";
import styles from "./index.module.css";
import stylesTable from "@/app/styles/table.module.css";

export default function RenderBoxingList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [isLoading, setIsLoading] = useState(true);
  const [boxers, setBoxers] = useState<BoxeadorInfo[]>([]);
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

  return (
    <main className={styles.boxer_main}>
      <section className={stylesTable.trainer_list_panel}>
        <header className={stylesTable.control_panel}>
          <p>Buscador de Boxeador</p>

          <article className={stylesTable.panel_actions}>
            <Search
              onChange={handleQueryChange}
              placeholder="Busca boxeador por: nombre apellido N° licencia"
            />

            <button disabled className={stylesTable.btn}>
              ordenar
            </button>
          </article>
        </header>

        <section className={styles.boxer_list}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <BoxerSkeleton key={i} />)
          ) : boxers.length > 0 ? (
            boxers.map((boxer) => (
              <Boxeador key={boxer.id} boxer={boxer} showLink />
            ))
          ) : (
            <div className={styles.boxer_not_found}>
              <h2>Boxeador no Encontrado</h2>
              <p>Intenta con otro nombre o apellido.</p>
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
