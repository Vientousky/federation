"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BoxeadorInfo } from "@/app/lib/Boxeador";
import ImgDrop from "@/app/admin/components/imgDrop/ImgDrop";
import Notification from "@/app/components/notification/Notification";
import styles from "../../crearAndEdit.module.css";

type BoxerProps = {
  boxer: BoxeadorInfo;
};

export default function FormBoxer({ boxer }: BoxerProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: boxer.nombre,
    apellido: boxer.apellido,
    status: boxer.status,
    dni: boxer.dni,
    sexo: boxer.sexo,
    fecha_nacimiento: boxer.fecha_nacimiento,
    numero_licencia: boxer.n_licencia,
    provincia: boxer.provincia,
    localidad: boxer.localidad,
    debutaje: boxer.debutaje,
    carrera: boxer.carrera,
    peso: boxer.peso,
    divicion: boxer.divicion,
    altura: boxer.altura,
    alcance: boxer.alcance,
    stance: boxer.stance,
    foto: boxer.boxer_foto,
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  async function sendBoxerData(data: typeof formData) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/boxeador/`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        setNotification({
          message: "Algo salió mal al crear el Boxeador ",
          type: "warning",
        });
        return false;
      }

      setNotification({
        message: "Boxeador creado exitosamente ",
        type: "success",
      });
      return true;
    } catch (error) {
      console.error(error);
      setNotification({ message: "Error de conexión", type: "error" });
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const exito = await sendBoxerData(formData);

    if (exito) {
      router.push("/admin/boxeador");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className={styles.boxer}>
          <article className={styles.boxerImg}>
            <ImgDrop
              width={200}
              height={300}
              initialImageUrl={boxer.boxer_foto}
              onImageUpload={(url) =>
                setFormData((prev) => ({ ...prev, foto: url }))
              }
            />
          </article>

          <div className={styles.boxerTrainer}>
            <h1>+</h1>
          </div>

          <div className={styles.boxerStance}>
            <div className={styles.inputGroup}>
              <article className={styles.inputField}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                  }
                  maxLength={100}
                  required
                />
              </article>

              <article className={styles.inputField}>
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      apellido: e.target.value,
                    }))
                  }
                  maxLength={100}
                  required
                />
              </article>
            </div>

            <div className={styles.selectGroup}>
              <label htmlFor="estado">Estado de Boxeador</label>
              <select
                id="estado"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                required
              >
                <option selected value="!-----!">
                  !-----!
                </option>
                <option value="Activo" selected>
                  Activo
                </option>
                <option value="Inactivo">Inactivo</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Retirado">Retirado</option>
              </select>
            </div>
          </div>

          <div className={styles.boxerDate}>
            <article className={styles.Date_item}>
              <label>DNI</label>
              <input
                type="text"
                value={formData.dni}
                maxLength={10}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dni: e.target.value }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Sexo</label>
              <select
                required
                value={formData.sexo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, sexo: e.target.value }))
                }
              >
                <option selected value="!-----!">
                  !-----!
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </article>

            <article className={styles.Date_item}>
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                value={formData.fecha_nacimiento}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fecha_nacimiento: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Num. licencia</label>
              <input
                type="text"
                maxLength={10}
                required
                value={formData.numero_licencia}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    numero_licencia: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Provincia</label>
              <input
                type="text"
                maxLength={50}
                required
                value={formData.provincia}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    provincia: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label htmlFor="localidad">Localidad</label>
              <select
                name="localidad"
                id="localidad"
                value={formData.localidad}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    localidad: e.target.value,
                  }))
                }
              >
                <option disabled selected>
                  !-----!
                </option>
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
                  <option value="Villa Río Bermejito">
                    Villa Río Bermejito
                  </option>
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
            </article>

            <article className={styles.Date_item}>
              <label>Carrera</label>
              <input
                type="date"
                value={formData.carrera}
                required
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    carrera: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Debutaje</label>
              <input
                type="date"
                required
                value={formData.debutaje}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    debutaje: e.target.value,
                  }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Peso</label>
              <input
                type="number"
                value={formData.peso}
                min={0}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, peso: e.target.value }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>División</label>
              <select
                value={formData.divicion}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, divicion: e.target.value }))
                }
              >
                <option selected value="!-----!">
                  !-----!
                </option>
                <option value="Peso Mosca">Mosca</option>
                <option value="Peso Gallo">Gallo</option>
                <option value="Peso Pluma">Pluma</option>
                <option value="Peso Ligero">Ligero</option>
                <option value="Peso Walter">Walter</option>
                <option value="Peso Medio">Medio</option>
                <option value="Peso Supermedio">Supermedio</option>
                <option value="Peso Semipesado">Semipesado</option>
                <option value="Peso Crucero">Crucero</option>
                <option value="Peso Pesado">Pesado</option>
              </select>
            </article>

            <article className={styles.Date_item}>
              <label>Altura</label>
              <input
                type="number"
                value={formData.altura}
                min={0}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, altura: e.target.value }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Alcance</label>
              <input
                type="number"
                value={formData.alcance}
                min={0}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, alcance: e.target.value }))
                }
              />
            </article>

            <article className={styles.Date_item}>
              <label>Postura</label>
              <select
                value={formData.stance}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, stance: e.target.value }))
                }
              >
                <option selected value="!-----!">
                  !-----!
                </option>
                <option value="Ortodoxo">Ortodoxo</option>
                <option value="Zurdo">Zurdo</option>
                <option value="Switch">Switch</option>
              </select>
            </article>
          </div>

          <div className={styles.cambios}>
            <button className={styles.guardar} type="submit">
              Guardar
            </button>

            <button
              type="button"
              className={styles.cancelar}
              onClick={() => router.push("/admin/boxeador")}
            >
              Cancelar
            </button>
          </div>
        </section>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}
