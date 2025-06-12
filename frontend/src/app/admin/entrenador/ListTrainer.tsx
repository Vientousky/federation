"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrainerInfo } from "@/app/data/Entrenador";
import ImgDrop from "../components/ImgDrop";
import stylesTables from "@/app/styles/table.module.css";
import { BsBrush, BsTrash, BsCheck, BsX } from "react-icons/bs";
import Image from "next/image";

type TrainerProps = {
  trainer: TrainerInfo;
};

export default function ListTrainer({ trainer }: TrainerProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrainer, setEditedTrainer] = useState<TrainerInfo>({
    id: trainer.id, 
    trainer_foto: trainer.trainer_foto,
    nombre: trainer.nombre,
    apellido: trainer.apellido,
    cargo: trainer.cargo,
    dni: trainer.dni,
    n_licencia: trainer.n_licencia,
    vencimiento: trainer.vencimiento,
    localidad: trainer.localidad,
  });

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

  const handleSave = async () => {
    // Enviar al servidor la URL final
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/${trainer.id}/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editedTrainer,
        }),
      }
    );

    // Actualiza la tabla
    router.refresh();
    setIsEditing(false);
  };

  return (
    <tr>
      <td data-cell="ID">{trainer.id}</td>
      <td data-cell="Trainer">
        <div className={stylesTables.person}>
          <span>
            {isEditing ? (
              <ImgDrop
                height={36}
                width={36}
                initialImageUrl={trainer.trainer_foto}
                onImageUpload={(url) =>
                  setEditedTrainer((prev) => ({ ...prev, trainer_foto: url }))
                }
              />
            ) : (
              <Image
                src={trainer.trainer_foto || "/img/default.jpeg"}
                alt={trainer.nombre}
                width={36}
                height={36}
              />
            )}
          </span>

          <span className={stylesTables.dateName}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTrainer.nombre}
                  onChange={(e) =>
                    setEditedTrainer({
                      ...editedTrainer,
                      nombre: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editedTrainer.apellido}
                  onChange={(e) =>
                    setEditedTrainer({
                      ...editedTrainer,
                      apellido: e.target.value,
                    })
                  }
                />
              </>
            ) : (
              <>
                {trainer.nombre} {trainer.apellido}
              </>
            )}
          </span>
        </div>
      </td>
      <td data-cell="Cargo">
        {isEditing ? (
          <>
            <select
              id="cargo"
              value={editedTrainer.cargo}
              onChange={(e) =>
                setEditedTrainer({
                  ...editedTrainer,
                  cargo: e.target.value,
                })
              }
              required
            >
              <option disabled selected>!-----!</option>
              <option value="Director Técnico">Director Técnico</option>
              <option value="Preparador Físico">Preparador Físico</option>
              <option value="Nutricionista">Nutricionista</option>
            </select>
          </>
        ) : (
          trainer.cargo
        )}
      </td>
      <td data-cell="DNI">{trainer.dni}</td>

      <td data-cell="N°Licencia">
        {isEditing ? (
          <>
            <input
              type="text"
              id="n_licencia"
              value={editedTrainer.n_licencia}
              onChange={(e) =>
                setEditedTrainer((prev) => ({
                  ...prev,
                  n_licencia: e.target.value,
                }))
              }
              maxLength={16}
              required
            />
          </>
        ) : (
          trainer.n_licencia
        )}
      </td>

      <td data-cell="Vecimiento">
        {isEditing ? (
          <>
            <input
              type="date"
              id="vencimiento"
              value={editedTrainer.vencimiento}
              onChange={(e) =>
                setEditedTrainer((prev) => ({
                  ...prev,
                  vencimiento: e.target.value,
                }))
              }
              required
            />
          </>
        ) : (
          trainer.vencimiento
        )}
      </td>

      <td data-cell="Localidad">
        {isEditing ? (
          <>
            <select
              name="localidad"
              id="localidad"
              value={editedTrainer.localidad}
              onChange={(e) =>
                setEditedTrainer((prev) => ({
                  ...prev,
                  localidad: e.target.value,
                }))
              }
              required
            >
              <option disabled selected> !-----!</option>
              <optgroup label="Almirante Brown">
                <option value="Concepción del Bermejo">
                  Concepción del Bermejo
                </option>
                <option value="Los Frentones">Los Frentones</option>
                <option value="Pampa del Infierno">Pampa del Infierno</option>
                <option value="Taco Pozo">Taco Pozo</option>
              </optgroup>
              <optgroup label="Bermejo">
                <option value="General Vedia">General Vedia</option>
                <option value="Isla del Cerrito">Isla del Cerrito</option>
                <option value="La Leonesa">La Leonesa</option>
                <option value="Las Palmas">Las Palmas</option>
                <option value="Puerto Bermejo">Puerto Bermejo</option>
                <option value="Puerto Eva Perón">Puerto Eva Perón</option>
              </optgroup>
              <optgroup label="Chacabuco">
                <option value="Charata">Charata</option>
              </optgroup>
              <optgroup label="Comandante Fernández">
                <option value="Presidencia Roque Sáenz Peña">
                  Presidencia Roque Sáenz Peña
                </option>
              </optgroup>
              <optgroup label="Doce de Octubre">
                <option value="Gancedo">Gancedo</option>
                <option value="General Capdevila">General Capdevila</option>
                <option value="General Pinedo">General Pinedo</option>
              </optgroup>
              <optgroup label="Dos de Abril">
                <option value="Hermoso Campo">Hermoso Campo</option>
              </optgroup>
              <optgroup label="Fray Justo Santa María de Oro">
                <option value="Chorotis">Chorotis</option>
                <option value="Santa Sylvina">Santa Sylvina</option>
              </optgroup>
              <optgroup label="General Belgrano">
                <option value="Corzuela">Corzuela</option>
              </optgroup>
              <optgroup label="General Donovan">
                <option value="La Escondida">La Escondida</option>
                <option value="La Verde">La Verde</option>
                <option value="Lapachito">Lapachito</option>
                <option value="Makallé">Makallé</option>
              </optgroup>
              <optgroup label="General Güemes">
                <option value="El Sauzalito">El Sauzalito</option>
                <option value="El Espinillo">El Espinillo</option>
                <option value="Fuerte Esperanza">Fuerte Esperanza</option>
                <option value="Juan José Castelli">Juan José Castelli</option>
                <option value="Miraflores">Miraflores</option>
                <option value="Misión Nueva Pompeya">
                  Misión Nueva Pompeya
                </option>
                <option value="Villa Río Bermejito">Villa Río Bermejito</option>
              </optgroup>
              <optgroup label="Independencia">
                <option value="Avia Terai">Avia Terai</option>
                <option value="Campo Largo">Campo Largo</option>
                <option value="Napenay">Napenay</option>
              </optgroup>
              <optgroup label="Libertad">
                <option value="Colonia Popular">Colonia Popular</option>
                <option value="Laguna Blanca">Laguna Blanca</option>
                <option value="Puerto Tirol">Puerto Tirol</option>
                <option value="General Obligado">General Obligado</option>
                <option value="Cardoso">Cardoso</option>
                <option value="Puerto Bastiani">Puerto Bastiani</option>
                <option value="Villa Jalon">Villa Jalón</option>
                <option value="Cruce Viejo">Cruce Viejo</option>
              </optgroup>
              <optgroup label="Libertador General San Martín">
                <option value="Ciervo Petiso">Ciervo Petiso</option>
                <option value="General Jose de San Martín">
                  General Jose de San Martín
                </option>
                <option value="La Eduvigis">La Eduvigis</option>
                <option value="Laguna Limpia">Laguna Limpia</option>
                <option value="Pampa del Indio">Pampa del Indio</option>
                <option value="Pampa Almirón">Pampa Almirón</option>
                <option value="Presidencia Roca">Presidencia Roca</option>
              </optgroup>
              <optgroup label="Maipu">
                <option value="Tres Isletas">Tres Isletas</option>
              </optgroup>
              <optgroup label="Mayor Luis Jorge Fontana">
                <option value="Coronel Du Graty">Coronel Du Graty</option>
                <option value="Enrique Urién">Enrique Urién</option>
                <option value="Villa Ángela">Villa Ángela</option>
              </optgroup>
              <optgroup label="Nueve de Julio">
                <option value="Las Breñas">Las Breñas</option>
              </optgroup>
              <optgroup label="O'Higgins">
                <option value="La Clotilde">La Clotilde</option>
                <option value="La Tigra">La Tigra</option>
                <option value="San Bernardo">San Bernardo</option>
              </optgroup>
              <optgroup label="Presidencia de la Plaza">
                <option value="Presidencia de la Plaza">
                  Presidencia de la Plaza
                </option>
              </optgroup>
              <optgroup label="Primero de Mayo">
                <option value="Margarita Belén">Margarita Belén</option>
                <option value="Colonia Benítez">Colonia Benítez</option>
              </optgroup>
              <optgroup label="Quitilipi">
                <option value="Quitilipi">Quitilipi</option>
                <option value="San Martín">San Martín</option>
              </optgroup>
              <optgroup label="San Fernando">
                <option value="Resistencia">Resistencia</option>
                <option value="Barranqueras">Barranqueras</option>
                <option value="Basail">Basail</option>
                <option value="Fontana">Fontana</option>
                <option value="Puerto Vilelas">Puerto Vilelas</option>
              </optgroup>
              <optgroup label="San Lorenzo">
                <option value="Villa Berthet">Villa Berthet</option>
                <option value="Samuhú">Samuhú</option>
              </optgroup>
              <optgroup label="Sargento Cabral">
                <option value="Capitán Solari">Capitán Solari</option>
                <option value="Colonia Elisa">Colonia Elisa</option>
                <option value="Colonias Unidas">Colonias Unidas</option>
                <option value="Las Garcitas">Las Garcitas</option>
              </optgroup>
              <optgroup label="Tapenagá">
                <option value="Charadai">Charadai</option>
                <option value="Cote Lai">Cote Lai</option>
              </optgroup>
              <optgroup label="Veinticinco de Mayo">
                <option value="Machagai">Machagai</option>
              </optgroup>
            </select>
          </>
        ) : (
          trainer.localidad
        )}
      </td>

      <td data-cell="Editar">
        <div className={stylesTables.action}>
          {isEditing ? (
            <>
              <button
                className={stylesTables.guardar}
                onClick={handleSave}
                title="guardar"
              >
                <BsCheck />
              </button>

              <button
                className={stylesTables.cancelar}
                onClick={() => {
                  setEditedTrainer(trainer);
                  setIsEditing(false);
                }}
                title="cancelar"
              >
                <BsX />
              </button>
            </>
          ) : (
            <>
              <button
                className={stylesTables.editar}
                onClick={() => setIsEditing(true)}
                title="Editar"
              >
                <BsBrush />
              </button>
              <button
                className={stylesTables.eliminar}
                onClick={() => handleDelete(trainer.id)}
                title="Eliminar"
              >
                <BsTrash />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
