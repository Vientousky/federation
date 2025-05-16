"use client";

import { useRouter } from "next/navigation";
import { BsBrush, BsTrash } from "react-icons/bs";
import { BoxeadorInfo } from "@/app/data/Boxeador";
import Image from "next/image";
import styles from "./boxeador.module.css";

type Props = {
  boxeador: BoxeadorInfo;
};

export default function ListBoxer({ boxeador }: Props) {
  const router = useRouter()

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
      <td> {boxeador.id} </td>
      <td className={styles.boxeador}>
        <span>
          <Image
            src={
              boxeador.foto
                ? `https://res.cloudinary.com/drmsxwdwy/${boxeador.foto}` //Si esto tiene imagen es true si no es false pone default
                : "/img/default.jpeg"
            }
            alt={boxeador.nombre}
            width={36}
            height={36}
          />
        </span>

        <span>
          {boxeador.nombre} {boxeador.apellido}
        </span>
      </td>
      <td>{boxeador.sexo}</td>
      <td>{boxeador.numero_licencia}</td>
      <td>{boxeador.localidad}</td>
      <td>{boxeador.combate}</td>
      <td className={boxeador.status}>{boxeador.status}</td>

      <td className={styles.celda_acciones}>
        <button
          className={styles.botom_edictar}
          onClick={() => handleEdit(boxeador.id)}
        >
          <BsBrush />
        </button>

        <button
          className={styles.botom_eliminar}
          onClick={() => handleDelete(boxeador.id)}
        >
          <BsTrash />
        </button>
      </td>
    </tr>
  );
}
