"use client";

import { useRouter } from "next/navigation";
import { TrainerInfo } from "@/app/lib/Entrenador";
import Provincia from "@/app/data/provincia.json"
import stylesTables from "@/app/styles/table.module.css";
import { BsPen, BsTrash, } from "react-icons/bs";
import Image from "next/image";

type TrainerProps = {
  trainer: TrainerInfo;
};

export default function ListTrainer({ trainer }: TrainerProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (window.confirm("Quiere eliminar a este Estrenador")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 204) {
        router.refresh();
      }
    }
  };

  const handleEdit = (id:string) => {
    router.push(`./entrenador/editar/${id}`);
  }

  const getProvinciaNombre = (code: string) => {
      const prov = Provincia.find((p) => p.code === code);
      return prov ? prov.name : code;
    };

  return (
    <tr>
      <td data-cell="ID">{trainer.id}</td>
      <td data-cell="Trainer">
        <div className={stylesTables.person}>
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
        </div>
      </td>
      <td data-cell="Cargo">{trainer.dni}</td>
      <td data-cell="DNI">{trainer.cargo}</td>

      <td data-cell="N°Licencia">{trainer.licencia}</td>

      <td data-cell="Vecimiento">{trainer.vencimiento}</td>

      <td data-cell="Provincia">{getProvinciaNombre(trainer.provincias)}</td>

      <td data-cell="Localidad">{trainer.localidad}</td>

      <td data-cell="Editar">
        <div className={stylesTables.action}>
          <button
            className={stylesTables.editar}
            onClick={() => handleEdit(trainer.id)}
            title="Editar"
          >
            <BsPen />
          </button>
          <button
            className={stylesTables.eliminar}
            onClick={() => handleDelete(trainer.id)}
            title="Eliminar"
          >
            <BsTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
