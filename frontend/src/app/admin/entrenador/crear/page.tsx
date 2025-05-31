"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImgDrop from "../../components/ImgDrop";
import Notification from "@/app/components/Notification";
import Image from "next/image";
import styles from "./createTrainer.module.css";

export default function CrearEntrenadorPage() {
  const router = useRouter(); // Hook para navegación

  const [trainerData, setTrainerData] = useState({
    nombre: "",
    apellido: "",
    cargo: "",
    dni: "",
    n_licencia: "",
    vencimiento: "",
    localidad: "",
    trainer_foto: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  // Función para enviar datos al backend
  async function enviarDatos(data: typeof trainerData) {
    console.log("Enviando datos:", data);
    console.log("Foto es tipo:", typeof data.trainer_foto, data.trainer_foto);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrenador/`,
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
          message: "Algo salió mal al crear el Entrenador ",
          type: "warning",
        });
        return false;
      }

      setNotification({
        message: "Entrenador creado exitosamente ",
        type: "success",
      });
      return true;
    } catch (error) {
      console.error(error);
      setNotification({ message: "Error de conexión", type: "error" });
      return false;
    }
  }

  // Enviar y redirigir
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const exito = await enviarDatos(trainerData);

    if (exito) {
      router.push("/admin/entrenador");
    }
  };

  // Enviar y limpiar formulario
  const handleSaveAndAddAnother = async () => {
    const exito = await enviarDatos(trainerData);

    if (exito) {
      // Limpiar formulario para agregar otro
      setTrainerData({
        nombre: "",
        apellido: "",
        cargo: "",
        dni: "",
        n_licencia: "",
        vencimiento: "",
        localidad: "",
        trainer_foto: "",
      });
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.createTrainer}>
          <figure className={styles.trainerLogo}>
            <Image
              src="/img/logo.webp"
              alt="fa-cha-box"
              width={65}
              height={46}
            />

            <figcaption className={styles.slema}>
              <h1>Licencia de entrenador</h1>
              <p>Federacion chaqueña boxeo</p>
            </figcaption>
          </figure>

          <section className={styles.trainerDate}>
            <article className={styles.dateImg}>
              <ImgDrop
                width={350}
                height={350}
                onImageUpload={(url) =>
                  setTrainerData((prev) => ({ ...prev, trainer_foto: url }))
                }
              />
            </article>

            <div className={styles.dateContent}>
              <section className={styles.dateContentName}>
                <div className={styles.dateItem}>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    value={trainerData.nombre}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        nombre: e.target.value,
                      }))
                    }
                    maxLength={100}
                    required
                  />
                </div>

                <div className={styles.dateItem}>
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    value={trainerData.apellido}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        apellido: e.target.value,
                      }))
                    }
                    maxLength={100}
                    required
                  />
                </div>

                <div className={styles.dateItem}>
                  <label htmlFor="cargo">Cargo</label>
                  <select
                    id="cargo"
                    value={trainerData.cargo}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        cargo: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="!-----!"> !-----!</option>
                    <option value="Director Técnico">Director Técnico</option>
                    <option value="Preparador Físico">Preparador Físico</option>
                    <option value="Nutricionista">Nutricionista</option>
                  </select>
                </div>
              </section>

              <section className={styles.dateContentForm}>
                <div className={styles.dateItem}>
                  <label htmlFor="dni">DNI</label>
                  <input
                    type="text"
                    id="dni"
                    value={trainerData.dni}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        dni: e.target.value,
                      }))
                    }
                    maxLength={10}
                    required
                  />
                </div>

                <div className={styles.dateItem}>
                  <label htmlFor="n_licencia">Nº licencia</label>
                  <input
                    type="text"
                    id="n_licencia"
                    value={trainerData.n_licencia}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        n_licencia: e.target.value,
                      }))
                    }
                    maxLength={16}
                    required
                  />
                </div>

                <div className={styles.dateItem}>
                  <label htmlFor="vencimiento">Vencimiento</label>
                  <input
                    type="date"
                    id="vencimiento"
                    value={trainerData.vencimiento}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        vencimiento: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className={styles.dateItem}>
                  <label htmlFor="localidad">Localidad</label>
                  <select
                    name="localidad"
                    id="localidad"
                    value={trainerData.localidad}
                    onChange={(e) =>
                      setTrainerData((prev) => ({
                        ...prev,
                        localidad: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="!-----!"> !-----!</option>
                    <optgroup label="Almirante Brown">
                      <option value="Concepción del Bermejo">
                        Concepción del Bermejo
                      </option>
                      <option value="Los Frentones">Los Frentones</option>
                      <option value="Pampa del Infierno">
                        Pampa del Infierno
                      </option>
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
                      <option value="General Capdevila">
                        General Capdevila
                      </option>
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
                      <option value="Juan José Castelli">
                        Juan José Castelli
                      </option>
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
                </div>
              </section>
            </div>
          </section>

          <footer className={styles.trainerFooter}>
            <button type="submit">Guardar</button>

            <button type="button" onClick={handleSaveAndAddAnother}>
              Guardar y agrega otro
            </button>
          </footer>
        </div>
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
