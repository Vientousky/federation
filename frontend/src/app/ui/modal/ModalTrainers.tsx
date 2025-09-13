"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FetchSearch, FetchInvoicesPages } from "@/app/lib/Data";
import { TrainerInfo } from "@/app/lib/Entrenador";

import Image from "next/image";
import Modal from "@/app/ui/modal/Modal";
import Search from "@/app/components/search/Search";
import Pagination from "@/app/components/pagination/Pagination";
import TableSkeleton from "@/app/ui/skeleton/SkeletonTable";
import stylesTables from "@/app/styles/table.module.css";

type ModalTrainerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (trainer: TrainerInfo) => void;
};

export default function ModalTrainer({
  isOpen,
  onClose,
  onSelect,
}: ModalTrainerProps) {
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

    params.set("page", "1"); // Reiniciar a página 1 al cambiar búsqueda
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
    <Modal isOpen={isOpen} onClose={onClose} title="Selecciona un entrenador">
      <section className={stylesTables.trainer_list_panel}>
        <div className={stylesTables.control_panel}>
          <p>Entrenadores </p>

          <article className={stylesTables.panel_actions}>
            <Search
              onChange={handleQueryChange}
              placeholder="Busca a entrenador por: nombre, N°Licencia"
            />

            <button disabled className={stylesTables.btn}>
              ordenar
            </button>
          </article>
        </div>

        <table className={stylesTables.table}>
          <thead className={stylesTables.T_encabezado}>
            <tr>
              <th>ID</th>
              <th>Entrenador</th>
              <th>DNI</th>
              <th>Cargo</th>
              <th>licencia</th>
              <th>Provincia</th>
              <th>Localidad</th>
            </tr>
          </thead>

          <tbody className={stylesTables.T_cuerpo}>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <TableSkeleton key={i} />)
            ) : trainers.length > 0 ? (
              trainers.map((trainer) => (
                <tr
                  key={trainer.id}
                  onClick={() => onSelect(trainer)}
                >
                  <td>{trainer.id}</td>
                  <td className={stylesTables.person}>
                    <span>
                      <Image
                        src={trainer.foto_entrenador || "/img/default.jpeg"}
                        alt={trainer.nombre}
                        width={36}
                        height={36}
                      />
                    </span>
                    <span className={stylesTables.dateName}>
                      {trainer.nombre} {trainer.apellido}
                    </span>
                  </td>
                  <td>{trainer.dni}</td>
                  <td>{trainer.cargo}</td>
                  <td>{trainer.licencia}</td>
                  <td>{trainer.provincias}</td>
                  <td>{trainer.localidad}</td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td colSpan={8}></td>
                </tr>
                <tr className={stylesTables.NoEncontrado}>
                  <td colSpan={8}>Entrenador no encontrado</td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <div className={stylesTables.navigation_footer}>
          <Pagination totalPages={totalPages} />
        </div>
      </section>
    </Modal>
  );
}
