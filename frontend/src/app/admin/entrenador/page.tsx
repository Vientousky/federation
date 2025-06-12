"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TrainerInfo } from "@/app/data/Entrenador";
import { LoadData, FetchSearch } from "@/app/data/Data";
import ListTrainer from "./ListTrainer";
import Search from "@/app/components/search/Search";
import CrearLink from "../components/CreateLink/CrearLink";
import stylesTables from "@/app/styles/table.module.css";
import styles from "./trainer.module.css";
import TableSkeleton from "@/app/ui/skeleton/TableSkeleton";

export default function EntrenadorPageAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [trainers, setTrainers] = useState<TrainerInfo[]>([]);
  const [allTrainer, setAllTrainer] = useState<TrainerInfo[]>([]);

  const trainerTotal = allTrainer.length;

  const cargos = allTrainer.reduce<Record<string, number>>((acc, actual) => {
    acc[actual.cargo] = (acc[actual.cargo] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    const fechtAllTrainer = async () => {
      try {
        const data = await LoadData("/entrenador/");
        setAllTrainer(data);
      } catch (err) {
        console.error("Error loading all trainers", err);
      }
    };
    fechtAllTrainer();
  }, []);

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
    <main className={styles.trainerPanel}>
      {/* Panel de métricas de entrenadores */}
      <section className={styles.chargesPanel}>
        <article className={styles.chargeItemTotal}>
          <h1>Entrenadores Totales</h1>
          <p>{trainerTotal}</p>
        </article>

        <div className={styles.chargesList}>
          {Object.entries(cargos).map(([cargo, cantidad]) => (
            <article className={styles.chargeItem} key={cargo}>
              <h1>{cargo}</h1>
              <p>{cantidad}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Panel de busqueda y creacion de entrenadores */}
      <section className={styles.managePanel}>
        <Search
          onChange={setQuery}
          placeholder="Busca a entrenador por: nombre, apellido o N°Licencia"
        />

        <CrearLink
          href="/entrenador/crear"
          name="Crear Entrenador"
          label="Creación de Entrenador"
        />
      </section>

      {/* Lista de entrenadores */}
      <section className={stylesTables.trainerListPanel}>
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
