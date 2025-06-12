"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FetchSearch } from "../data/Data";
import { TrainerInfo } from "../data/Entrenador";
import Entrenador from "../components/Entrenador";
import SkeletonTrainer from "../ui/skeleton/SkeletonTrainer";
import Search from "../components/search/Search";
import styles from "./index.module.css";

export default function PageTrainer() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [trainers, setTrainers] = useState<TrainerInfo[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await FetchSearch("/entrenador/", query, 1);
          setTrainers(data);
        } catch (err) {
          console.error("Error fetching trainers", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query, setQuery]);

  return (
    <main className={styles.containerPage}>
      <section className={styles.searchTrainer}>
        <h1>BUSCADO DE ENTRENADORES</h1>
        <Search
          onChange={setQuery}
          placeholder="Busca entrenador por: nombre apellido N° licencia"
        />
      </section>

      <section className={styles.listTrainer}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonTrainer  key={i}/>)
        ) : trainers.length > 0 ? (
          trainers.map((trainer) => (
            <Entrenador
              key={trainer.id}
              trainer={trainer}
              link={`/entrenador/${trainer.id}`}
            />
          ))
        ) : (
          <div className={styles.trainer_not_found}>
            <h2>Entrenador no Encontrado</h2>
            <p>por favor introdusca otro</p>
          </div>
        )}
      </section>

      <section></section>
    </main>
  );
}
