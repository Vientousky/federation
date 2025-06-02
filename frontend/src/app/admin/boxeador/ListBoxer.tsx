"use client";

import { useRouter } from "next/navigation";
import { BsBrush, BsTrash } from "react-icons/bs";
import { BoxeadorInfo } from "@/app/data/Boxeador";
import stylesTables from "@/app/styles/table.module.css";
import Image from "next/image";

type Props = {
  boxeador: BoxeadorInfo;
};

export default function ListBoxer({ boxeador }: Props) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (window.confirm("Quiere eliminar a este boxeador")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 204) {
        router.refresh();
      }
    }
  };

  const handleEdit = (id: string) => {
    console.log(id);
  };

  return (
    <tr>
      <td data-cell="id"> {boxeador.id} </td>
      <td data-cell="boxeador" >
        <div className={stylesTables.person}>
          <span>
          <Image
            src={boxeador.foto || "/img/default.jpeg"}
            alt={boxeador.nombre}
            width={36}
            height={36}
          />
        </span>

        <span>
          {boxeador.nombre} {boxeador.apellido}
        </span>
        </div>
      </td>
      <td data-cell="sexo">{boxeador.sexo}</td>
      <td data-cell="N°Licencia">{boxeador.numero_licencia}</td>
      <td data-cell="Localidad">{boxeador.localidad}</td>
      <td data-cell="Combates">{boxeador.combate}</td>
      <td data-cell="Estatus" className={boxeador.status}>
        {boxeador.status}
      </td>

      <td data-cell="Editar">
        <div className={stylesTables.action}>
          <button
            className={stylesTables.editar}
            onClick={() => handleEdit(boxeador.id)}
          >
            <BsBrush />
          </button>

          <button
            className={stylesTables.eliminar}
            onClick={() => handleDelete(boxeador.id)}
          >
            <BsTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
